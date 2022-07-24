import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addWeather, weatherEdit } from "./redux/actions/actions";
import { useDispatch } from "react-redux";
import { GET_ALL_WEATHER } from "./query/WeatherQuery";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_WEATHER } from "./mutations/WeatherMutation";
import {UPDATE_WEATHER} from "./mutations/UpdateWeather"



 
export const UpsertWeatherModal = ({
  title,
  weatherDto,
  isOpen,
  onClose,
  isEdit,
}) => {
  const [weather, setWeather] = useState({});
  const [open, setOpen] = useState(isOpen);
  const [newWeather] = useMutation(ADD_WEATHER)
  const [updateWeather] = useMutation(UPDATE_WEATHER)
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (weatherDto) {
      setWeather(weatherDto);
    }
  }, [weatherDto]);
 
  const handleClose = async (e) => {
    setOpen(false);
    await onClose();
    setWeather({});
  };
 
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

 
  const handleSubmition = useCallback(async () => {
    setOpen(false);
    try {
      if (isEdit) {
        console.log("weather", weather);
        await updateWeather({
          variables:{
            id: weather.id,
            input:{
              city : weather.city,
              weather : weather.weather,
              temperature : weather.temperature,
              uvIndex : weather.uvIndex,
              wind : weather.wind,
              rainfall: weather.rainfall,
              humidity :weather.humidity,
              visibility : weather.visibility,
              pressure : weather.pressure
            }
          }
        })
        await onClose();
        dispatch(weatherEdit({ ...updateWeather }));
      } else {
        console.log("weather", weather)
        newWeather({
          variables:{
            input:{
              city : weather.city,
              weather : weather.weather,
              temperature : weather.temperature,
              uvIndex : weather.uvIndex,
              wind : weather.wind,
              rainfall: weather.rainfall,
              humidity :weather.humidity,
              visibility : weather.visibility,
              pressure : weather.pressure
            }
            
          }
        }).then(({data}) =>{
      console.log(data)   
      setWeather([newWeather])   
    })
        
      }
      setWeather({});
    } catch (err) {
      console.log(err);
    }
  }, [isEdit, weather]);
 
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="City"
          value={weather.city || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, city: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Weather"
          value={weather.weather || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, weather: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Temperature"
          value={weather.temperature || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, temperature: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="UV Index"
          value={weather.uvIndex || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, uvIndex: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Wind"
          value={weather.wind || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, wind: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Rainfall"
          value={weather.rainfall || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, rainfall: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Humidity"
          value={weather.humidity || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, humidity: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Visibility"
          value={weather.visibility || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, visibility: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Pressure"
          value={weather.pressure || ""}
          onChange={(event) =>
            setWeather((val) => ({ ...val, pressure: event.target.value }))
          }
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmition}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};