import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 *
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setReservationsError(null);
    async function loadDashboard() {
      const abortController = new AbortController();
      try {
        const data = await listReservations(date, abortController.signal);
        setReservations(data);
      } catch (error) {
        setReservationsError(error);
      }
      return () => abortController.abort();
    }
    loadDashboard();
  }, [date]);

  const clickHandler = ({ target }) => {
    if (target.name === "previous") {
      history.push(`/dashboard?date=${previous(date)}`);
    }
    if (target.name === "today") {
      history.push(`/dashboard?date=${today()}`);
    }
    if (target.name === "next") {
      history.push(`/dashboard?date=${next(date)}`);
    }
  };

  return (
    <main>
      <ErrorAlert error={reservationsError} />
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <button type="button" name="previous" onClick={clickHandler}>
        Previous
      </button>
      <button type="button" name="today" onClick={clickHandler}>
        Today
      </button>
      <button type="button" name="next" onClick={clickHandler}>
        Next
      </button>
      <hr />
      {reservations.map((reservation) => (
        <div key={reservation.reservation_id}>
          <p>First Name: {reservation.first_name}</p>
          <p>Last Name: {reservation.last_name}</p>
          <p>Mobile Number: {reservation.mobile_number}</p>
          <p>Reservation Date: {reservation.reservation_date}</p>
          <p>Reservation Time: {reservation.reservation_time}</p>
          <p>Party Size: {reservation.people}</p>
          <hr />
        </div>
      ))}
    </main>
  );
}

export default Dashboard;
