let input = document.getElementById("input-field")
let form = document.getElementById("weather-form")
let cityNameandTempDisplay = document.getElementById("display1")
let weatherSearchDisplay = document.getElementById("display2")

let cityArray = []

form.addEventListener("submit", cityEntered)
function cityEntered(event){
    event.preventDefault()
    weatherSearchDisplay.style.display = "flex"
    let enteredCity = input.value.trim();
    if(enteredCity == ""){
        alert("Please enter a city name")
        return
    }

    let cityLiteral = {
        cityName : enteredCity
    };

    cityArray.push(cityLiteral)
    localStorage.setItem("StoredCity", JSON.stringify(cityArray))

    
    form.reset()
    fetchWeatherData(enteredCity)
}


function fetchWeatherData(city){
    const weatherRequest = new XMLHttpRequest()
    let APIKEY = "22d7794af7b0f7122706aa81ee62932f"
    weatherRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)

    weatherRequest.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
        let data = JSON.parse(this.responseText)
        displayOnUi(data)
    }
}

function displayOnUi(data){
    weatherSearchDisplay.innerHTML = ``
    let timezone = data.timezone
    let temperature = data.main.temp
    let pressure = data.main.pressure
    let humidity = data.main.humidity
    let feels = data.main.feels_like
    let visibility = data.visibility
    let windspeed = data.wind.speed
    let cityNameEntered = data.name
    let weather = data.weather[0].description

    let cityNameCont = document.createElement("div")
    cityNameCont.classList.add("city")

    let cityNameText = document.createElement("h3")
    cityNameText.textContent = cityNameEntered

    let firstDisplayTemp = document.createElement("h3")
    firstDisplayTemp.textContent = `${(temperature - 273.15).toFixed()}°C`

    let timeZoneCont = document.createElement("div")
    timeZoneCont.classList.add("timezone")

    let timeZoneText = document.createElement("h3")
    timeZoneText.textContent = `Timezone`

    let displaytimeZone = document.createElement("h2")
    displaytimeZone.textContent = timezone

    let weatherDisCont = document.createElement("div")
    weatherDisCont.classList.add("weather")

    let weatherText = document.createElement("h3")
    weatherText.textContent = `Weather`

    let displayWeather = document.createElement("h2")
    displayWeather.textContent = weather

    let windHumidityVisibilityCont = document.createElement("div")
    windHumidityVisibilityCont.classList.add("wind-hum-vis")

    let windCont = document.createElement("div")
    windCont.classList.add("wind")

    let windText = document.createElement("p")
    windText.textContent = `Wind Speed`

    let displayWind = document.createElement("h3")
    displayWind.textContent = windspeed

    let humidityCont = document.createElement("div")
    humidityCont.classList.add("humidity")

    let humidityText = document.createElement("p")
    humidityText.textContent = `Humidity`

    let displayHumidity = document.createElement("h3")
    displayHumidity.textContent = humidity

    let visibilityCont = document.createElement("div")
    visibilityCont.classList.add("visibility")

    let visibilityText = document.createElement("p")
    visibilityText.textContent = `Visibility`

    let displayVisibility = document.createElement("h3")
    displayVisibility.textContent = visibility

    let pressureFeelsTempCont = document.createElement("div")
    pressureFeelsTempCont.classList.add("pres-temp-feels")

    let pressureCont = document.createElement("div")
    pressureCont.classList.add("pressure")

    let pressureText = document.createElement("p")
    pressureText.textContent = `Pressure`

    let displayPressure = document.createElement("h3")
    displayPressure.textContent = pressure

    let temperatureCont = document.createElement("div")
    temperatureCont.classList.add("temperature")

    let temperatureText = document.createElement("p")
    temperatureText.textContent = `Temperature`

    let displayTemperature = document.createElement("h3")
    displayTemperature.textContent = `${(temperature - 273.15).toFixed()}°C`

    let feelsCont = document.createElement("div")
    feelsCont.classList.add("feels")

    let feelsText = document.createElement("p")
    feelsText.textContent = `Feels like`

    let displayFeels = document.createElement("h3")
    displayFeels.textContent = feels



    cityNameCont.append(cityNameText, firstDisplayTemp)
    cityNameandTempDisplay.append(cityNameCont)

    timeZoneCont.append(timeZoneText, displaytimeZone)

    weatherDisCont.append(weatherText, displayWeather)

    windCont.append(windText, displayWind)
    humidityCont.append(humidityText, displayHumidity)
    visibilityCont.append(visibilityText, displayVisibility)
    windHumidityVisibilityCont.append(windCont, humidityCont, visibilityCont)

    pressureCont.append(pressureText, displayPressure)
    temperatureCont.append(temperatureText, displayTemperature)
    feelsCont.append(feelsText, displayFeels)
    pressureFeelsTempCont.append(pressureCont, temperatureCont, feelsCont)

    weatherSearchDisplay.append(timeZoneCont, weatherDisCont, windHumidityVisibilityCont, pressureFeelsTempCont)
}

weatherRequest.send()
}

