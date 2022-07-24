 import { gql } from "@apollo/client";

 export const ADD_WEATHER = gql`
 mutation addWeather($input: weatherInput) {
     addWeather(input: $input) {
        id
        city
        weather
        temperature
        uvIndex
        wind
        rainfall
        humidity
        visibility
        pressure
     }
 }
`