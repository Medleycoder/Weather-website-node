const request = require('request')

const forecast = (latitide,longitude,callback)=>{
 
    const url = 'http://api.weatherstack.com/current?access_key=57de7454211c7993c8c025fb05038d8f&query='+latitide+','+longitude+'&units=f'
    request({url,json:true},(error,{ body }={})=>{
        
        if(error){
            callback('No network server found',undefined)
        }else if(body.error){
            callback('No such coordinates found',undefined)
        }else{
            callback(undefined,'The temperature of '+ body.location.region+','+body.location.country +'!!! is '+ body.current.temperature +' F , But feels like ' + body.current.feelslike +' F' + 'The weather description is '+ body.current.weather_descriptions + ' and the humidity level is of '+ body.current.humidity)
        }
    })
}
module.exports=forecast