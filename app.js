//start global variables
//const strApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,is_day,weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch'
//end global variables

document.querySelector('#btnSelect').addEventListener('click', async function(){
    const strCity = document.querySelector('#cboCity').value.trim()
    let lat = 0, long = 0
    //if statements to set each city lat long?

    if(strCity !== ""){
        if(strCity === "los angeles"){
            //strDisplayCity = "Los Angeles"
            lat = 34.055
            long = -118.243
        }
        else if(strCity === "san francisco"){
            //strCity = "San Francisco"
            lat = 37.7749
            long = -122.4194
        }
        else if(strCity === "new york city"){
            //strCity = "New York City"
            lat = 40.7128
            long = -74.0060
        }
        else if(strCity === "dallas"){
            //strCity = "Dallas"
            lat = 32.7767
            long = -96.7970
        }
        else if(strCity === "miami"){
            //strCity = "Miami"
            lat = 25.7617
            long = -80.1918
        }
        else if(strCity ==="cleveland"){
            //strCity = "Cleveland"
            lat = 41.4993
            long = -81.6944
        }

        let strUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch`
        
        console.log(strUrl)

        try{
            const objResponse = await fetch(strUrl);

            if(!objResponse.ok){
                throw new Error(`HTTP Error Status: ${objResponse.status}`);
            }

            const objData = await objResponse.json();

            
            let temperature = objData.current.temperature_2m
            let humidity = objData.current.relative_humidity_2m
            let apparentTemp = objData.current.apparent_temperature
            let weatherCode = objData.current.weather_code

            if(weatherCode === 0){
                strIcon = "bi bi-sun"
            } else if(weatherCode >=1 &&  weatherCode<= 3){
                strIcon = "bi bi-cloud-sun"
            } else if(weatherCode === 45 || weatherCode === 48){
                strIcon = "bi bi-cloud-fog"
            } else if(weatherCode >= 51 && weatherCode <= 55){
                strIcon = "bi bi-cloud-rain"
            } else if(weatherCode === 56 || weatherCode === 57){
                strIcon = "bi bi-cloud-sleet"
            } else if(weatherCode >= 61 && weatherCode <= 65){
                strIcon = "bi bi-cloud-rain-heavy"
            } else if(weatherCode === 66 || weatherCode === 67){
                strIcon = "bi bi-cloud-sleet-fill"
            } else if(weatherCode >= 71 && weatherCode <= 75){
                strIcon = "bi bi-cloud-snow"
            } else if(weatherCode === 77){
                strIcon = "bi bi-snow2"
            } else if(weatherCode >= 80 && weatherCode <= 82){
                strIcon = "bi bi-cloud-rain-heavy"
            } else if(weatherCode === 85 || weatherCode === 86){
                strIcon = "bi bi-cloud-snow"
            } else if(weatherCode === 95){
                strIcon = "bi bi-cloud-lightning-rain"
            } else if(weatherCode === 96 || weatherCode === 99){
                strIcon = "bi bi-cloud-lightning-rain"
            }

            

        document.querySelector('#divIcon').innerHTML = `
        <i class="${strIcon}" style="font-size: 4rem; "></i>`

        document.querySelector("#divTemp").innerHTML = `
        <p>Temperature: ${temperature} Farenheit</p>`
        
        document.querySelector('#divApparent').innerHTML = `
        <p>Feels like: ${apparentTemp}</p>`
        
        document.querySelector('#divHumidity').innerHTML = `
        <p>Humidity: ${humidity}%</p>`
            
    } catch(objError){
        console.log('Error fetching objData:', objError);
        
    }

    }else{
        Swal.fire({
            title:"Oops, please select a city",
            icon: 'error'
        })
    }

})

//NOTE: I did use chatGPT for debugging (so not sure if it counts as using its "code" or not when it says how to fix)
//debugged my innerHTML (was using getElementById and not querySelector)
//additionally i used chatgpt to debug my swal.fire error not popping up (forgot to link the js file and if statement operators (used = instead of ===))
//additionally i used chatgpt to explain lines 41-48 again