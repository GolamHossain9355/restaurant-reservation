import React, { useState } from "react";
import { listReservationsByMobileNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListAllReservations from "./ListAllReservations";

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
      <form onSubmit={submitHandler}>
        <label htmlFor="mobile_number">Search: </label>
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          required
          onChange={changeHandler}
          value={mobileNumber}
        ></input>
        <button type="submit">Find</button>
      </form>
      {matchingReservations.length > 0 &&
        matchingReservations[0] !== "no reservation" && (
          <ListAllReservations reservations={matchingReservations} />
        )}
      {matchingReservations[0] === "no reservation" && (
        <h4>No reservations found</h4>
      )}
    </>
  );
}
