import React from "react";
import { useHistory } from "react-router-dom";

export default function TablesNew({submitHandler, changeHandler, formData}) {
  const history = useHistory()
  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="table_name">Table Name:</label>
        <input
          type="text"
          name="table_name"
          id="table_name"
          placeholder="Table Name"
          minLength="2"
          required
          onChange={changeHandler}
          value={formData.table_name}
        />
        <br />
        <label htmlFor="capacity">Table Capacity:</label>
        <input
          type="number"
          name="capacity"
          id="capacity"
          placeholder="1"
          min="1"
          required
          onChange={changeHandler}
          value={formData.capacity}
        />
        <br/>
        <br/>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </>
  );
}
