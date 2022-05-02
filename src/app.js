const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//JOINING THE PATH TO PUBLIC VISIBLE DIRECTORY AND ASSIGNING TO CONST 
//THEN PASS IT TO EXPRESS.STATIC IN SHOWING PATH SECTION
//DEFINE PATH FOR EXPRESS CONFIG
const publicDirectory = path.join(__dirname,'../public')
//For Views
const viewsPath = path.join(__dirname,'../templates/views')
//FOr Partials
const partialsPath = path.join(__dirname,'../templates/partials')



//LOADING EXPRESS TO CONST//
const app = express()

//For HEROKU//
const port = process.env.PORT || 3000

//SETTING HSB TO BE USE BY TEMPLATE ENGINE//
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//SHOWING PATH TO RENDER WHICH IS PUBLIC FOLDER //
app.use(express.static(publicDirectory))



//Main Page//
app.get('',(req,res)=>{
    res.render('index',{
        title: 'WEATHER APP',
        name: 'MEDLEY'
    })
})

//ABOUT PAGE//
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'ABOUT PAGE',
        name: 'MEDLEY',
        
    })
})

//HELP//
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'HELP PAGE',
        message: 'HERE IS SOMETHING FOR YOUR HELP',
        name: 'MEDLEY'
    })
})



//404 Error FOR SEACH QUERY PAPAMETER For Help//
app.get('/help/*',(req,res)=>{
   res.render('404',{
       title: '404 Error',
       errorMessage: 'Page Artical not Found'
   })
})
//SEARCH QUERY PARAMETER FOR WEATHER//
//WEATER//
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            Error: 'You Must PROVIDE ADDRESS '
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
       forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
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

//404 PAGES//
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Error',
        errorMessage: 'Page Not Found'
    })
})

//SERVER//
app.listen(port, ()=>{
    console.log("Server is up baby at "+ port)
})