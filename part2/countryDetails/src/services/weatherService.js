import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/3.0/onecall'
const units = 'metric'
const API = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY



const getWeather = (lat, lon) => {
    const exclude = 'minutely,hourly,daily,alerts'

    const request = axios.get(
      `${baseURL}?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${API}`
    );

    return request.then(response => response.data)
}

export default {getWeather}