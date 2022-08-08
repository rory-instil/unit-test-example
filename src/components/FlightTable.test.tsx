import {store} from "../redux/Store";
import {Provider} from "react-redux";
import {FlightTable} from "./FlightTable";
import {fireEvent, render} from "@testing-library/react";
import {Flight} from "../model/Flight";
import {readFlights} from "../redux/AsyncActions";

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

const expectedHeaders = [
    "ID",
    "Origin",
    "Departure",
    "Destination",
    "Arrival"
];

beforeEach(() => {
    jest.clearAllMocks();
});

test("Flight table has refresh button and table with header", async () => {
    const flightTableHtmlElement = await renderFlightTable();

    expect(getRefreshButton(flightTableHtmlElement)).toBeTruthy();
    expect(getTable(flightTableHtmlElement)).toBeTruthy();
    hasExpectedHeaders(flightTableHtmlElement);
})

function hasExpectedHeaders(flightTableHtmlElement: HTMLElement) {
    const tableHeader = getTable(flightTableHtmlElement).getElementsByTagName("thead");
    expect(tableHeader).toHaveLength(1);
    const headerColumns = tableHeader[0].getElementsByTagName("th");
    for (let i = 0; i < expectedHeaders.length; i++) {
        expect(headerColumns[i].textContent).toEqual(expectedHeaders[i]);
    }
}

test("Empty Flight Table", async () => {
    const flightTableHtmlElement = await renderFlightTable();

    hasExpectedBody(flightTableHtmlElement, []);
});

test("Flight table has one row", async () => {
    const singleFlight = [flights[0]];
    const flightTableHtmlElement = await renderFlightTable(singleFlight);

    clickRefreshButton(flightTableHtmlElement);
    hasExpectedBody(flightTableHtmlElement, singleFlight);
});

test("Flight table has two rows", async () => {
    const flightTableHtmlElement = await renderFlightTable(flights);

    clickRefreshButton(flightTableHtmlElement);
    hasExpectedBody(flightTableHtmlElement, flights);
});

function clickRefreshButton(flightTableHtmlElement: HTMLElement) {
    fireEvent.click(flightTableHtmlElement);
}

function getRefreshButton(flightTableHtmlElement: HTMLElement) {
    const buttons = flightTableHtmlElement.getElementsByTagName("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0].textContent).toEqual("Refresh");

    return buttons[0];
}

function hasExpectedBody(flightTableHtmlElement: HTMLElement, flights: Flight[]) {
    const tableBody = getTable(flightTableHtmlElement).getElementsByTagName("tbody");
    expect(tableBody).toHaveLength(1);
    const tableBodyRows = tableBody[0].getElementsByTagName("tr");
    expect(tableBodyRows.length).toEqual(flights.length);
    flights.forEach((flight, index) => {
        const columns = tableBodyRows.item(index)?.getElementsByTagName("td");
        if (!columns) {
            fail("Expected flight columns for flight index [" + index + "] but none found");
        } else {
            expect(columns.length).toBe(5);
            expect(columns!.item(0)!.textContent).toEqual(flight.id.toString());
            expect(columns!.item(1)!.textContent).toEqual(flight.origin);
            expect(columns!.item(2)!.textContent).toEqual(flight.departure);
            expect(columns!.item(3)!.textContent).toEqual(flight.destination);
            expect(columns!.item(4)!.textContent).toEqual(flight.arrival);
        }
    })
}

function getTable(flightTableHtmlElement: HTMLElement) {
    const tables = flightTableHtmlElement.getElementsByClassName("table");
    expect(tables).toHaveLength(1);
    return tables[0];
}

async function renderFlightTable(flights: Flight[] = []) {
    setupMockFlights(flights);
    store.dispatch({
        type: readFlights.fulfilled,
        payload: flights
    })
    const {container} = render(<Provider store={store}>
        <FlightTable />
    </Provider>)
    return container;
}

function setupMockFlights(mockFlights: Flight[] = []) {
    jest.mock("../services/FlightService", () => ({
        getAll: () => Promise.resolve(mockFlights)
    }));
}