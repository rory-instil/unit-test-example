import {State} from "./Store";
import {Sorting} from "../model/Sorting";
import {createSelector} from "@reduxjs/toolkit";
import * as _ from "lodash";
import {Flight} from "../model/Flight";

export const flightSortingSelector: (state: State) => Sorting = (state: State) => state.flights.sorting;
export const flightsSelector = (state: State) => state.flights.flights;
export const isLoadingSelector = (state: State) => state.flights.isLoading;

export const sortedFlightsSelector = createSelector(
  flightsSelector,
  flightSortingSelector,
  (flights: Flight[], sorting: Sorting) => _.orderBy(flights, [sorting.column], [sorting.direction])
);
