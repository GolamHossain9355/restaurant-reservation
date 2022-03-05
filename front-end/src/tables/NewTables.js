import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import FormTables from "./FormTables";

export default function NewTables() {
  const history = useHistory();
  const initialData = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [reservationError, setReservationError] = useState(null);

  const changeHandler = ({ target }) => {
    let value = target.value;
    if (target.name === "capacity") value = Number(value);

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    async function loadTables() {
      try {
        await createTable(formData, abortController.signal);
        history.push(`/dashboard`);
      } catch (error) {
        setReservationError(error);
      }
    }

    loadTables();
    return () => abortController.abort();
  };

  return (
    <>
      <ErrorAlert error={reservationError} />
      <FormTables
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        formData={formData}
      />
    </>
  );
}
