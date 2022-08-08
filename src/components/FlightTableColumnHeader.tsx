import { FC } from "react";
import {useDispatch, useSelector} from "react-redux";
import {flightSortingSelector} from "../redux/Selectors";
import {columnToggled} from "../redux/Slice";

export interface FlightTableColumnHeaderProps {
  label: string;
  propertyName: string;
}

export const FlightTableColumnHeader: FC<FlightTableColumnHeaderProps> = ({label, propertyName}) => {
  const sorting = useSelector(flightSortingSelector);
  const dispatch = useDispatch();

  return <th style={{cursor: "pointer"}}
             onClick={() => dispatch(columnToggled(propertyName))}>
    {label}
    {sorting.column === propertyName
      ? <i className={`ml-2 fa fa-sort-amount-${sorting.direction}`} aria-hidden="true"/>
      : null
    }
  </th>;
}
