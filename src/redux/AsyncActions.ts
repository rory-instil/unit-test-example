import {createAsyncThunk} from "@reduxjs/toolkit";
import * as FlightService from "../services/FlightService";

export const readFlights = createAsyncThunk('readFlights', async () => {
  return await FlightService.getAll();
});