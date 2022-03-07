import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

export default function ListReservations({ reservations, date }) {
  const history = useHistory();

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
    <>
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
      {reservations.length ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Party Size</th>
              <th>Status</th>
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
                  {reservation.status}{" "}
                  {reservation.status === "booked" && (
                    <a
                      className="btn btn-secondary"
                      href={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      Seat
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>No reservations for today</h4>
      )}
    </>
  );
}
