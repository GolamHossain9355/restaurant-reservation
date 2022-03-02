import React, { useEffect, useState } from "react";
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
  const [currentDate, setCurrentDate] = useState(date);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    setReservationsError(null);
    async function loadDashboard() {
      const abortController = new AbortController();
      try {
        const data = await listReservations(currentDate, abortController.signal);
        setReservations(data);
      } catch (error) {
        setReservationsError(error);
      }
      return () => abortController.abort();
    }
    loadDashboard();
  }, [currentDate]);

  const clickHandler = ({ target }) => {
    if (target.name === "previous") {
      setCurrentDate(previous(currentDate))
    }
    if (target.name === "today") {
      setCurrentDate(today())
    }
    if (target.name === "next") {
      setCurrentDate(next(currentDate))
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {currentDate}</h4>
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
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
