import {columnToggled, flightReducer, FlightState} from "./Slice";
import {readFlights} from "./AsyncActions";

const initialState: FlightState = {
    flights: [],
    isLoading: false,
    sorting: {
        column: "id",
        direction: "asc"
    }
};

test("should return the initial state", () => {
    expect(flightReducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle sort toggle", () => {
    const targetColumn = "origin";
    const expectedState = {
        ...initialState,
        sorting: {
            column: targetColumn,
            direction: "asc"
        }
    };
    const action = columnToggled(targetColumn);

    expect(flightReducer(initialState, action)).toEqual(expectedState);
});

test("should be isLoading", () => {
    const expectedState = {
        ...initialState,
        isLoading: true
    };
    const action = readFlights.pending;

    expect(flightReducer(initialState, action)).toEqual(expectedState);
});

test("should be fulfilled", () => {
    const expectedFlights = [{
        id: 1,
        origin: "Belfast",
        destination: "London",
        departure: new Date(),
        arrival: new Date()
    }]
    const expectedState = {
        ...initialState,
        isLoading: false,
        flights: expectedFlights
    };
    const action = {
        type: readFlights.fulfilled,
        payload: expectedFlights
    };

    expect(flightReducer(initialState, action)).toEqual(expectedState);
});