import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {FlightsApp} from "./components/FlightApp";
import {Provider} from "react-redux";
import {store} from "./redux/Store";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <FlightsApp/>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
