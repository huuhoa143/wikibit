const axios = require('axios')

module.exports = async (ipHeader, phone, ethAddress, otp, ref = "lafXwNFnYk") => {
    const headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Language': 'vi,vi-VN',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'https://www.wikibit.cc',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.wikibit.cc/lafXwNFnYk',
        'Accept-Language': 'vi-VN,vi;q=0.9',
        ...ipHeader
    }

    const data = `{"area_code":"0084","smscode":"${otp}","phoneNumber":"${phone}","eth_address":"${ethAddress}","type":1,"communication":"${phone}","g-recaptcha-response":"","event":"${ref}"}`

    console.log({data})
    const options = {
        url: 'https://www.wikibit.cc/api/v1/oauth/validateCode',
        method: 'POST'
    }

    const response = await axios({method: options.method || 'GET', url: options.url, headers, data})
    return response.data
}
