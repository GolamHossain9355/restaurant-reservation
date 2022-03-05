import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ListAllTables from "../tables/ListAllTables";
import { listTables, assignTable } from "../utils/api";

export default function SeatingReservation() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservationError, setReservationError] = useState(null);
  const { reservationId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);
    async function loadTables() {
      try {
        const data = await listTables(abortController.signal);
        setTables(data);
      } catch (error) {
        setReservationError(error);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (tables.length) {
      setSelectedTable(tables[0].table_id);
    }
  }, [tables]);

  const changeHandler = ({ target }) => {
    setSelectedTable(Number(target.value));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setReservationError(null);
    async function reserveTable() {
      try {
        await assignTable(
          { reservation_id: reservationId },
          selectedTable,
          abortController.signal
        );
        history.push("/dashboard");
      } catch (error) {
        setReservationError(error);
      }
    }
    reserveTable();
    return () => abortController.abort();
  };

  return (
    <>
      <ErrorAlert error={reservationError} />
      <form onSubmit={submitHandler}>
        <label htmlFor="table_id">Choose a table:</label>
        <select name="table_id" id="table_id" onChange={changeHandler}>
          {tables.map((table) => (
            <option value={table.table_id} key={table.table_id}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
      <ListAllTables tables={tables} />
    </>
  );
}
