const NodeGeocoder = require('node-geocoder');

module.exports = getLatLong = async (address) => {
    const options = {
        provider: 'google',
        apiKey: process.env.GOOGLE_MAPS_API_KEY
    }
    
    const geocoder = NodeGeocoder(options)
    
    const res = await geocoder.geocode(address)
    return res
}