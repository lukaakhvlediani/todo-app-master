import { gql } from "@apollo/client";

export const UPDATE_WEATHER = gql`
mutation updateWeather($id:ID!,$input: weatherInput) {
    updateWeather(id:$id,input: $input) {
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
`;
