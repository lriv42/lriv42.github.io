//start global variables
//const strApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,is_day,weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch'
//end global variables

document.querySelector('#btnSelect').addEventListener('click', async function(){
    const strCity = document.querySelector('#cboCity').value.trim()
    let lat = 0, long = 0

    //if statements to set each city lat long?

    if(strCity !== ""){
        if(strCity === "los angeles"){
            lat = 34.055
            long = -118.243
        }
        else if(strCity === "san francisco"){
            lat = 37.7749
            long = -122.4194
        }
        else if(strCity === "new york city"){
            lat = 40.7128
            long = -74.0060
        }
        else if(strCity === "dallas"){
            lat = 32.7767
            long = -96.7970
        }
        else if(strCity === "miami"){
            lat = 25.7617
            long = -80.1918
        }
        else if(strCity ==="cleveland"){
            lat = 41.4993
            long = -81.6944
        }

        let strUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,,apparent_temperature,is_day,weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch`
        
        console.log(strUrl)

        try{
            const objResponse = await fetch(strUrl);

            if(!objResponse.ok){
                throw new Error(`HTTP Error Status: ${objResponse.status}`);
            }

            const objData = await objResponse.json();

            // Extract Data
            let temperature = objData.current.temperature_2m;
            let humidity = objData.current.relative_humidity_2m;
            let apparentTemp = objData.current.apparent_temperature

        document.querySelector("#divWeather").innerHTML = `
            <h3>${strCity}:</h3>
            <p>Temperature: ${temperature} Farenheit</p>
            <p>Feels like: ${apparentTemp}</p>
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