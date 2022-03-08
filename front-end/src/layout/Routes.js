import React from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservations from "../reservations/NewReservations";
import NewTables from "../tables/NewTables"
import ReservationSeating from "../reservations/SeatingReservation"
import SearchReservations from "../search/SearchReservations"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Routes() {
  const query = useQuery();
  let date = query.get("date");

  if (!date) date = today();

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservations />
      </Route>
      <Route exact path="/reservations/:reservationId/seat">
        <ReservationSeating />
      </Route>
      <Route path="/tables/new">
        <NewTables />
      </Route>
      <Route path="/search">
        <SearchReservations />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
