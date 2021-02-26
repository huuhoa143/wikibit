const { default: Axios } = require("axios")

const BASE_URL = 'http://otpsim.com'
const API_KEY = '74e8b4fbd0a692ae0f9ac932cdd0c41d'
const GAPO_SERVICE_ID = 11

const axios = require('axios')

const _getAvailableService = async () => {
    const response = await axios.get(`${BASE_URL}/api/v2/available-services?apiKey=${API_KEY}`)
    return response.data
}

const _createOrder = async () => {
    const response = await axios.get(`${BASE_URL}/api/phones/request?token=${API_KEY}&service=${GAPO_SERVICE_ID}&network=3`)
    return response.data
}

const _getServiceMessage = async (orderId) => {
    if (!orderId) throw new Error('Order ID not found.')

    const response = await axios.get(`${BASE_URL}/api/sessions/${orderId}?token=${API_KEY}`)

    return response.data
}

module.exports = {
    _getAvailableService,
    _getServiceMessage,
    _createOrder,
}
