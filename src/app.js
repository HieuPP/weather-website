const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Define paths for express config
const directoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handelbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(directoryPath))

//Setup route
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hieu'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hieu'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help text',
        name: 'Hieu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if (error) {
                return res.send({error})
            }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
        })
    })
  
})

app.get('/product', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Hieu',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Hieu',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log("Server is up on port 3000")
})