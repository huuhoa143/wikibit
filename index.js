const Verification = require('./api/verification')
const SmsSend = require('./api/sms-send')
const ValidateCode = require('./api/validate-code')
const {randomIPHeader, randomEtherWallet} = require('./helper/random')
const {_createOrder, _getServiceMessage} = require('./helper/otpsim')

function parseToken(result) {

    result = result.match(/\d+/g)
    result = result[0]
    return result
}

const getOTP = (phone, orderID) => {
    return new Promise((resolve, reject) => {
        const start = new Date()

        let handleFn = async () => {
            let end = new Date() - start
            if (end > 60000) reject("time out")
            else {
                let response = await _getServiceMessage(orderID)
                console.log('Đang lấy mã số điện thoại', phone)
                if (response.data.messages) {
                    const otp = parseToken(response.data.messages[0].sms_content)
                    resolve(otp)
                } else {
                    setTimeout(handleFn, 3000)
                }
            }
        }
        setTimeout(handleFn, 0)
    })
}

setImmediate(async () => {

    for (let i = 0; i < 1; i++) {
        const ipHeader = randomIPHeader()
        const ethWallet = randomEtherWallet()

        let isLoadingPhone = true
        let phone = ''
        let orderID = ''
        while (isLoadingPhone) {
            const getOTPSIMPhone = await _createOrder()
            if (!getOTPSIMPhone.success) throw new Error(getOTPSIMPhone.message)
            phone = getOTPSIMPhone.data.phone_number
            orderID = getOTPSIMPhone.data.session
            let status = getOTPSIMPhone.message
            console.log({ statusString: status })
            if (phone && phone.length > 0)
                isLoadingPhone = false
            await new Promise(resolve => setTimeout(resolve, 2000))
        }
        console.log({ phone, ethWallet })

        let response = await Verification(ipHeader, ethWallet)
        const {code: codeVerification, msg: msgVerification} = response

        console.log({codeVerification, msgVerification})
        response = await SmsSend(ipHeader, phone)

        const {code: codeSmsSend, msg: msgSmsSend} = response

        console.log({codeSmsSend, msgSmsSend})

        const otp = await getOTP(phone, orderID)
        console.log({ otp })
        response = await ValidateCode(ipHeader, phone, ethWallet, otp, 'lafXwNFnYk')

        console.log({response})

        require('fs').appendFileSync('./data/accounts.txt', `${phone}\n`, () => { })

    }
})
