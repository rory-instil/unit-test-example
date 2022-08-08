import {Flight} from "../model/Flight";
import { FC } from "react";

export interface FlightRowProps {
  flight: Flight
}

export const FlightTableRow: FC<FlightRowProps> = ({flight}) =>
  <tr>
    <td>{flight.id}</td>
    <td>{flight.origin}</td>
    <td>{flight.departure}</td>
    <td>{flight.destination}</td>
    <td>{flight.arrival}</td>
  </tr>;
