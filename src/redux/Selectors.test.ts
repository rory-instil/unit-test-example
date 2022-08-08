import {sortedFlightsSelector} from "./Selectors";
import {FlightState} from "./Slice";
import {Flight} from "../model/Flight";
import {Sorting} from "../model/Sorting";

const date = new Date();

const flights: Flight[] = [
    {
        id: 1,
        origin: "Belfast",
        destination: "London",
        departure: date.toDateString(),
        arrival: addHours(date, 1).toDateString()
    },
    {
        id: 2,
        origin: "London",
        destination: "Belfast",
        departure: addHours(date, 24).toDateString(),
        arrival: addHours(date, 25).toDateString()
    }];

function addHours(date: Date, hours: number): Date {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);

    return newDate;
}

const state: FlightState = {
    flights,
    isLoading: false,
    sorting: {
        column: "id",
        direction: "asc"
    }
};

describe("Sort by id", () => {
    it("Ascending", () => {
        const sortedFlights = sort({
            column: "id",
            direction: "asc"
        });

        expect(sortedFlights[0]).toEqual(flights[0]);
        expect(sortedFlights[1]).toEqual(flights[1]);
    })
    it("Descending", () => {
        const sortedFlights = sort({
            column: "id",
            direction: "desc"
        });

        expect(sortedFlights[0]).toEqual(flights[1]);
        expect(sortedFlights[1]).toEqual(flights[0]);
    })
})

describe("Sort by origin", () => {
    it("Ascending", () => {
        const sortedFlights = sort({
            column: "origin",
            direction: "asc"
        });

        expect(sortedFlights[0]).toEqual(flights[0]);
        expect(sortedFlights[1]).toEqual(flights[1]);
    })
    it("Descending", () => {
        const sortedFlights = sort({
            column: "origin",
            direction: "desc"
        });

        expect(sortedFlights[0]).toEqual(flights[1]);
        expect(sortedFlights[1]).toEqual(flights[0]);
    })
})

describe("Sort by destination", () => {
    it("Ascending", () => {
        const sortedFlights = sort({
            column: "destination",
            direction: "asc"
        });

        expect(sortedFlights[0]).toEqual(flights[1]);
        expect(sortedFlights[1]).toEqual(flights[0]);
    })
    it("Descending", () => {
        const sortedFlights = sort({
            column: "destination",
            direction: "desc"
        });

        expect(sortedFlights[0]).toEqual(flights[0]);
        expect(sortedFlights[1]).toEqual(flights[1]);
    })
})

describe("Sort by departure", () => {
    it("Ascending", () => {
        const sortedFlights = sort({
            column: "departure",
            direction: "asc"
        });

        expect(sortedFlights[0]).toEqual(flights[0]);
        expect(sortedFlights[1]).toEqual(flights[1]);
    })
    it("Descending", () => {
        const sortedFlights = sort({
            column: "departure",
            direction: "desc"
        });

        expect(sortedFlights[0]).toEqual(flights[1]);
        expect(sortedFlights[1]).toEqual(flights[0]);
    })
})

describe("Sort by arrival", () => {
    it("Ascending", () => {
        const sortedFlights = sort({
            column: "arrival",
            direction: "asc"
        });

        expect(sortedFlights[0]).toEqual(flights[0]);
        expect(sortedFlights[1]).toEqual(flights[1]);
    })
    it("Descending", () => {
        const sortedFlights = sort({
            column: "arrival",
            direction: "desc"
        });

        expect(sortedFlights[0]).toEqual(flights[1]);
        expect(sortedFlights[1]).toEqual(flights[0]);
    })
})

function sort(sorting: Sorting) {
    return sortedFlightsSelector({
        flights: {
            ...state,
            sorting
        }
    })
}