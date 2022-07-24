import {
  ADD_WEATHER,
  EDIT_WEATHER,
  SET_WEATHERS
} from "../constants/constants";
 
export const initialState = {
  weatherArray: [],
  currentWeather: null,
};
const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(initialState, "THIS IS INITIAL");
  switch (type) {
    case ADD_WEATHER: {
      return {
        ...state,
        weatherArray: [...state.weatherArray, payload],
      };
    }
    case SET_WEATHERS:{
      return {
        ...state,
        weatherArray: payload,
      };
    }
    case EDIT_WEATHER: {
      let existingArray = [...state.weatherArray];
      const index = existingArray.findIndex((x) => x._id === payload._id);
      existingArray.splice(index, 1);
      const weatherArray = [...existingArray, payload];
      console.log(index,"<====== this is index")
      console.log("EDIT_WEATHER", existingArray, weatherArray,"this is payload=====>", payload);
 
      return {
        ...state,
        weatherArray,
      };
    }
    default:
      return state;
  }
};
 
export default rootReducer;