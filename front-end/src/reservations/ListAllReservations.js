import React from "react";
import { updateReservationStatus, listReservations } from "../utils/api";

export default function ListAllReservations({
  reservations,
  date,
  setReservations,
}) {
  const clickHandler = ({ target }) => {
    const confirm = window.confirm(
      "Do you want to cancel this reservation? \n\n This cannot be undone."
    );
    const abortController = new AbortController();
    async function loadCancelReservation() {
      try {
        await updateReservationStatus(
          { status: "canceled" },
          target.id,
          abortController.signal
        );
        const data = await listReservations(date, abortController.signal);
        setReservations(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (confirm) loadCancelReservation();
    return () => abortController.abort();
  };

  if (reservations.length) {
    return (
      <div className="outside-table-container">
        <div className="table-container">
          <table className="table-reservations">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Party Size</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservation_id}>
                  <td>{reservation.first_name}</td>
                  <td>{reservation.last_name}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>{reservation.reservation_date}</td>
                  <td>{reservation.reservation_time}</td>
                  <td>{reservation.people}</td>
                  <td data-reservation-id-status={reservation.reservation_id}>
                    {reservation.status}
                  </td>
                  <td>
                    {reservation.status.length > 0 && (
                      <div className="table-buttons">
                        {reservation.status === "booked" && (
                          <a
                            className="button-seat"
                            href={`/reservations/${reservation.reservation_id}/seat`}
                          >
                            Seat
                          </a>
                        )}{" "}
                        {
                          <a
                            className="button-edit"
                            href={`/reservations/${reservation.reservation_id}/edit`}
                          >
                            Edit
                          </a>
                        }{" "}
                        <button
                          className="button-cancel"
                          onClick={clickHandler}
                          data-reservation-id-cancel={
                            reservation.reservation_id
                          }
                          id={reservation.reservation_id}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reservations[0]["first_name"].length === 0 && (
            <h4>No reservations for today</h4>
          )}
        </div>
      </div>
    );
  }
  return <h4 className="loading-text">Loading...{reservations.length}</h4>
}
