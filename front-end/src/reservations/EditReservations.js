import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import FormReservations from "../reservations/FormReservations";

export default function EditReservations() {
  const { reservationId } = useParams();
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

  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      try {
        const data = await getReservation(
          reservationId,
          abortController.signal
        );
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          mobile_number: data.mobile_number,
          reservation_date: formatAsDate(data.reservation_date),
          reservation_time: data.reservation_time,
          people: data.people,
        });
      } catch (error) {
        setReservationError(error);
      }
    }

    loadReservation();
    return () => abortController.abort();
  }, []);

  const changeHandler = ({ target }) => {
    let value = target.value;
    if (target.name === "people") {
      value = Number(value);
    }
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function loadUpdateReservation() {
      try {
        await updateReservation(
          formData,
          reservationId,
          abortController.signal
        );
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setReservationError(error);
      }
    }
    loadUpdateReservation();
    return () => abortController.abort();
  };

  const clickHandler = () => history.goBack();

  return (
    <>
      <ErrorAlert error={reservationError} />
      <FormReservations
        formData={formData}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        clickHandler={clickHandler}
      />
    </>
  );
}
