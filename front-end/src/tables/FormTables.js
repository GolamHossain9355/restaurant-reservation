import React from "react";
import { useHistory } from "react-router-dom";
import "./FormTables.css"

export default function TablesNew({ submitHandler, changeHandler, formData }) {
  const history = useHistory();
  return (
    <>
      <form onSubmit={submitHandler} className="tables-form">
        <div>
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
        </div>
        <div>
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
        </div>
        <div className="tables-button-container">
          <button type="submit" className="submit">Submit</button>
          <button type="button" className="cancel" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
