import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { createReservation } from "../../utils/api";

export default function NewReservations() {
  const history = useHistory();
  const initialData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [reservationError, setReservationError] = useState(null);

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addReservation() {
      try {
        await createReservation({ data: formData }, abortController.signal);
        history.push("/dashboard");
      } catch (error) {
        setReservationError(error);
      }
    }
    addReservation();
    return () => abortController.abort();
  };

  const clickHandler = () => history.goBack();

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          placeholder="First Name"
          required
          onChange={changeHandler}
          value={formData.first_name}
        />
        <br />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
          required
          onChange={changeHandler}
          value={formData.last_name}
        />
        <br />
        <label htmlFor="mobile_number">Mobile Number:</label>
        <input
          type="tel"
          id="mobile_number"
          name="mobile_number"
          placeholder="123-456-7890"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          onChange={changeHandler}
          value={formData.mobile_number}
        />
        <br />
        <label htmlFor="reservation_date">Reservation Date:</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          required
          onChange={changeHandler}
          value={formData.reservation_date}
        />
        <br />
        <label htmlFor="reservation_time">Reservation Time:</label>
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          required
          onChange={changeHandler}
          value={formData.reservation_time}
        />
        <br />
        <label htmlFor="people">Party Size:</label>
        <input
          type="number"
          id="people"
          name="people"
          placeholder="0"
          min="1"
          maxLength="3"
          required
          onChange={changeHandler}
          value={formData.people}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
        <button type="button" name="cancel" onClick={clickHandler}>
          Cancel
        </button>
      </form>
      <ErrorAlert error={reservationError} />
    </>
  );
}
