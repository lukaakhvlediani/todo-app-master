import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { TableColumnDefs } from "./WeatherTable";
import { UpsertWeatherModal } from "./upsertWeatherModal";
import { useMutation, useQuery,gql } from "@apollo/client";
import { setWeathers } from "./redux/actions/actions";
import { GET_ALL_WEATHER } from "./query/WeatherQuery";


const dictionary = {
  "ID":'id',
  "Cities":"city",
  "Weather":'weather',
  "Temperature":'temperature',
  "UV Index":'uvIndex',
  "Wind":'wind',
  "Rainfall":'rainfall',
  "Humidity":'humidity',
  "Visibility":'visibility',
  "Pressure":'pressure'
}
const names = [
  "ID",
  "Cities",
  "Weather",
  "Temperature",
  "UV Index",
  "Wind",
  "Rainfall",
  "Humidity",
  "Visibility",
  "Pressure",
];
export const Weather = () => {
  const [open, setOpen] = useState(false);
  const [parameters, setParameters] = useState(names);
  const [edit, setEdit] = useState(false);
  const [tableColumnDefs, setTableColumnDefs] = useState(TableColumnDefs);
  const [toBeEditedWeather, setToBeEditedWeather] = useState();
  const {data,loading,error, client, refetch} = useQuery(GET_ALL_WEATHER)
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { weatherArray: getWeather } = useSelector((state) => ({
    weatherArray: state.weatherArray,
  }));

  let navigate = useNavigate();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setParameters(typeof value === "string" ? value.split(",") : value);
  };

  const handleEditing = (id) => {
    console.log("getWeather", getWeather, id);
    const weather = getWeather.find((item) => item.id === id);
    console.log("weather", weather);
    setEdit(!edit);
    setToBeEditedWeather(weather);
    setOpen(true);
  };

  useEffect(() => {
    setTableColumnDefs(
      TableColumnDefs.filter((x) => parameters.includes(x.label))
    );
    
    let query = gql `
        query{
          getAllWeather{
              ${(parameters || []).map(x=>dictionary[x]).join('\n')}
          }
        }
      `;

    client.query({
      query
    });
  }, [parameters]);

  useEffect(()=>{
    console.log("data", data)
    if(data){
      dispatch(setWeathers(data.getAllWeather))
    }
  }, [data])

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </button>
      <div>
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Parameters
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={parameters}
              onChange={handleChange}
              input={<OutlinedInput label="Parameters" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={parameters.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button align="left" variant="outlined" onClick={handleClickOpen}>
            Create
          </Button>
          <UpsertWeatherModal
            isEdit={edit}
            weatherDto={toBeEditedWeather}
            title={"Add Item"}
            isOpen={open}
            onClose={async () => {
              if (edit) {
                setEdit(false);
                setToBeEditedWeather({});
              }
              setOpen(false);
              await client.refetchQueries({
                include: "all",
              });
            }}
          ></UpsertWeatherModal>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableColumnDefs.map((tableColumnDef) => (
                  <TableCell key={tableColumnDef.label} align="left">
                    {tableColumnDef.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(getWeather || [])?.map((items, index) => (
                <TableRow
                  onDoubleClick={() => handleEditing(items.id)}
                  key={items.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {tableColumnDefs.map((def) => (
                    <TableCell key={def.label + "val"} align="left">
                      {def.value(items)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
