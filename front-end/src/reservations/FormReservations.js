import "./NewReservations.css";

export default function ReservationsForm({
  formData,
  changeHandler,
  submitHandler,
  clickHandler,
}) {
  return (
    <div>
      <form onSubmit={submitHandler} className="new-reservations-form">
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            type="tel"
            id="mobile_number"
            name="mobile_number"
            placeholder="123-456-7890"
            required
            onChange={changeHandler}
            value={formData.mobile_number}
          />
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div className="button-container">
          <button type="submit" className="submit">Submit</button>
          <button type="button" name="cancel" className="cancel" onClick={clickHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
