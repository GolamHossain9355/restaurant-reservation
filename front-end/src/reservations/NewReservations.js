import { useState } from "react";
import { useHistory } from "react-router-dom";
import FormReservations from "./FormReservations";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

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
    async function addReservation() {
      try {
        await createReservation(formData, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setReservationError(error);
      }
    }
    addReservation();
    return () => abortController.abort();
  };
  console.log(formData)

  const clickHandler = () => history.goBack();

  return (
    <div>
      <ErrorAlert error={reservationError} />
      <FormReservations
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        formData={formData}
        clickHandler={clickHandler}
      />
    </div>
  );
}
