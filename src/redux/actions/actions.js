import {
  ADD_WEATHER,
  EDIT_WEATHER,
  SET_WEATHERS
} from '../constants/constants';

const addWeather = (payload) => ({
  type: ADD_WEATHER,
  payload,
});

const weatherEdit = (payload) => ({
  type: EDIT_WEATHER,
  payload,
});


const setWeathers = (payload) => ({
  type: SET_WEATHERS,
  payload,
});


export { addWeather, weatherEdit, setWeathers};