import { gql } from "@apollo/client";

export const GET_ALL_WEATHER = gql `
  query{
    getAllWeather{
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