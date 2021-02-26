const axios = require('axios')

module.exports = async (ipHeader, ethAddress) => {
    const headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
        'Language': 'vi,vi-VN',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.wikibit.cc/lafXwNFnYk',
        'Accept-Language': 'vi-VN,vi;q=0.9',
        ...ipHeader
    }

    const options = {
        url: `https://www.wikibit.cc/api/v1/participate/verification?eth_address=${ethAddress}`
    }

    const response = await axios({method: options.method || 'GET', url: options.url, headers, })
    return response.data
}
