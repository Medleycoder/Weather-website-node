const request = require('request')

const geocode = (address,callback)=>{
  
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWVkbGV5dmlzIiwiYSI6ImNsMmVlOGw3dzAzYmIzZ3A0ZXFhZHg4ODIifQ.9JYhf29v3pDYsss9IghuDg&limit=1'
    request({url,json:true},(error,{ body }={})=>{
        if(error){
           callback("No network found!!!!",undefined)
        }else if(body.features.length === 0 ){
            callback("No search found!!! Try something else!",undefined)
        }else{
            callback(undefined,{
                latitude  : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location  : body.features[0].place_name
                
            })
           
        }
    })
}
module.exports = geocode
