const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=aea32d49c84e8f6bd7c425840a51cf91&query=' + latitude + ',' + longtitude + '&units=m'
    request({url, json: true}, (Error, {body} = {}) => {
        if (Error) {
            callback('Unable to conect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, 'Weather Description: ' + body.current.weather_descriptions + ', temperature: ' + body.current.temperature + ', feelslike: '+ body.current.feelslike)
        }
    })
}

module.exports = forecast