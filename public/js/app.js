console.log('APP Is USING JAVA BBY')



const weatherFormEl = document.querySelector('form') 
const searchEl = document.querySelector('input')
const messageGeoEl = document.querySelector('.messageLocation')
const messageForcastEl = document.querySelector('.messageForecast')



weatherFormEl.addEventListener('submit',(e)=>{
  
    e.preventDefault()

  const location = searchEl.value
  messageGeoEl.textContent = 'Loading.......'
  messageForcastEl.textContent = ''

    if(!location){
       return messageGeoEl.textContent = 'Input field must be filled'
    }
  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
         if(data.error){
            messageGeoEl.textContent = data.error
         }else{
             messageGeoEl.textContent= data.location
             messageForcastEl.textContent = data.forecast
         }
    })
}) 

  
})