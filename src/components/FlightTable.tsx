import { FC } from "react";
import {useDispatch, useSelector} from "react-redux";
import {isLoadingSelector, sortedFlightsSelector} from "../redux/Selectors";
import {FlightTableRow} from "./FlightTableRow";
import {FlightTableColumnHeader} from "./FlightTableColumnHeader";
import {Flight} from "../model/Flight";

const columns = [
  {label: 'ID', property: 'id'},
  {label: 'Origin', property: 'origin'},
  {label: 'Departure', property: 'departure'},
  {label: 'Destination', property: 'destination'},
  {label: 'Arrival', property: 'arrival'},
];

export const FlightTable: FC = () => {
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  const orderedFlights: Flight[] = useSelector(sortedFlightsSelector);

  return (
    <>
      <button className="btn btn-primary mr-2"
              disabled={isLoading}
              onClick={() => dispatch({type: "readFlights"})}>
        Refresh
      </button>
      {isLoading
          ? <i className="fa fa-spinner fa-spin" aria-hidden="true"/>
          : null
      }
      <table className="table table-hover table-striped">
        <thead>
        <tr>
          {columns.map(column =>
            <FlightTableColumnHeader
                key={column.property}
                label={column.label}
                propertyName={column.property}
            />
          )}
        </tr>
        </thead>
        <tbody>
        {orderedFlights.map((flight: Flight) =>
            <FlightTableRow
                key={flight.id}
                flight={flight}
            />
        )}
        </tbody>
      </table>
    </>
  );
}
