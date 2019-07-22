const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express()

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gagan Tripathi'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: "About Page",
        name: 'Gagan Tripathi'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help Page',
        name: 'Gagan Tripathi',
        message: 'This is help page'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
        return res.send({
            error: "No address is provided"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error)
        {
            return res.send({ error }) 
            // console.log(error)        
        }
        // console.log(data.location)
        // console.log(location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({ error })
                // console.log(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.get('*', (req, res) =>{
//     res.send('My 404 page')
// })

app.get("/help/*", (req, res) =>{
    res.render('404-page', {
        title: '404 Page',
        message: 'Help article not found',
        name: "Gagan Tripathi"
    })
})

app.get("*", (req, res) =>{
    res.render('404-page', {
        title: '404 Page',
        message: 'Page not found',
        name: "Gagan Tripathi"
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})