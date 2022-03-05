import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListAllReservations from "../reservations/ListAllReservations";
import ListAllTables from "../tables/ListAllTables";
import "../layout/Layout.css";

/**
 * Defines the dashboard page.
 *
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    async function loadReservations() {
      try {
        const data = await listReservations(date, abortController.signal);
        setReservations(data);
      } catch (error) {
        setReservationsError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, [date]);

  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    async function loadTables() {
      try {
        const data = await listTables(abortController.signal);
        setTables(data);
      } catch (error) {
        setReservationsError(error);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

  return (
    <main>
      <ErrorAlert error={reservationsError} />
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ListAllReservations reservations={reservations} date={date} />
      <hr />
      <ListAllTables tables={tables} />
    </main>
  );
}

export default Dashboard;
