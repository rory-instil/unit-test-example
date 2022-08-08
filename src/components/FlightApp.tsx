import { FC } from 'react';
import {FlightTable} from "./FlightTable";
import {Home} from "./Home";
import {Routes, Route, Link} from "react-router-dom";

export const FlightsApp: FC = () => {
  return (
    <div className="container">
      <header>
        <h1>Flights</h1>
      </header>
      <hr/>
        <Link to="/">
          <button className="btn btn-primary mr-1">Home</button>
        </Link>
      <Link to="/flights">
        <button className="btn btn-primary mr-1">Flights</button>
      </Link>
      <hr/>
      <div>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/flights" element={<FlightTable/>}/>
              <Route path="/*" element={<h2>404 Error</h2>}/>
          </Routes>
      </div>
    </div>
  );
};
