import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Sorting, toggleSorting} from "../model/Sorting";
import {Flight} from "../model/Flight";
import {readFlights} from "./AsyncActions";

export interface FlightState {
  sorting: Sorting;
  flights: Flight[];
  isLoading: boolean;
}

const initialState = {
  sorting: {
    column: 'id',
    direction: "asc"
  },
  flights: [],
  isLoading: false
} as FlightState;

const slice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    columnToggled(state, {payload: columnName}: PayloadAction<string>) {
      state.sorting = toggleSorting(state.sorting, columnName);
    }
  },
  extraReducers: builder => builder
      .addCase(readFlights.pending, (state) => {
        state.isLoading = true;
      }).addCase(readFlights.fulfilled, (state, {payload: flights}) => {
        state.flights = flights;
        state.isLoading = false;
      })
});

export const flightReducer = slice.reducer;

export const {
  columnToggled
} = slice.actions;
