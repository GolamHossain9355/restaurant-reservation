import React, { useState } from "react";
import { listReservationsByMobileNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListAllReservations from "./ListAllReservations";
import "./SearchReservations.css";

export default function SearchReservation() {
  const [matchingReservations, setMatchingReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");

  const changeHandler = ({ target }) => {
    setMobileNumber(target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    async function loadMatchingReservations() {
      try {
        const data = await listReservationsByMobileNumber(
          mobileNumber,
          abortController.signal
        );
        data.length
          ? setMatchingReservations(data)
          : setMatchingReservations(["no reservation"]);
      } catch (error) {
        setReservationsError(error);
      }
    }

    loadMatchingReservations();
    return () => abortController.abort();
  };

  return (
    <>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={submitHandler} className="form">
        <h1>Search By Phone Number</h1>
        <div>
          <label htmlFor="mobile_number"></label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            className="input"
            placeholder="123-456-7890"
            required
            onChange={changeHandler}
            value={mobileNumber}
          ></input>
          <button type="submit">Find</button>
        </div>
      </form>
      {matchingReservations.length > 0 &&
        matchingReservations[0] !== "no reservation" && (
          <ListAllReservations reservations={matchingReservations} />
        )}
      {matchingReservations[0] === "no reservation" && (
        <div className="no-reservation-header">
          <h2>No reservations found</h2>
        </div>
      )}
    </>
  );
}
