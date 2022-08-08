import {FlightsApp} from "./FlightApp";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {store} from "../redux/Store";
import {Provider} from "react-redux";

test("Should render Home by default", () => {
    renderFlightsApp();
    expectHomeIsDisplayed();
})

function expectHomeIsDisplayed() {
    expect(screen.getByText("Welcome to the best flight related app in this course")).toBeVisible();
}

test("Should render Flight Table", () => {
    renderFlightsApp();

    clickButton("Flights");

    expectFlightTableIsDisplayed();
})

function clickButton(buttonText: string) {
    const elementsWithText = screen.getAllByText(buttonText);
    fireEvent.click(elementsWithText.filter(element => element.tagName === "BUTTON")[0]);
}

function expectFlightTableIsDisplayed() {
    expect(screen.getByText("Refresh")).toBeVisible();
}

test("Should render Error Page", () => {
    renderFlightsApp("/error");

    expectErrorPageIsDisplayed();
})

function expectErrorPageIsDisplayed() {
    expect(screen.getByText("404 Error")).toBeVisible();
}

function renderFlightsApp(initialEntries = "/") {
    return render(
        <MemoryRouter initialEntries={[initialEntries]}>
            <Provider store={store}>
                <FlightsApp/>
            </Provider>
        </MemoryRouter>
    );
}