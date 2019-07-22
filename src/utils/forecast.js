const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = "https://api.darksky.net/forecast/f50f5a0cefa4da815e56a4e2bf3c466d/"+latitude+","+longitude
    request({url, json: true}, (error, response) =>{
        const {error: err, currently} = response.body
        if(error)
        {
            callback("Unable to connect to weather services", undefined)
        } else if(err)
        {
            callback("Error: "+err, undefined)
        }
        else{
            const {temperature, precipProbability} = currently
            callback(undefined,response.body.daily.data[0].summary+" It is currently "+ temperature +" degrees out. The high temperature today is "+ response.body.daily.data[0].temperatureHigh +" with a low temperature of "+ response.body.daily.data[0].temperatureLow+". There is a "+ precipProbability+"% chance of rain")
        }
    })
}

module.exports = forecast
