import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {flightReducer} from "./Slice";
import {readFlights} from "./AsyncActions";

export const reducer = combineReducers({
  flights: flightReducer,
});

export type State = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer
});

store.dispatch(readFlights());
