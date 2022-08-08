import {render, screen} from "@testing-library/react";
import {Home} from "./Home";

test("Should render home", () => {
    render(<Home/>);

    expect(screen.getByText("Welcome to the best flight related app in this course")).toBeInTheDocument();
})