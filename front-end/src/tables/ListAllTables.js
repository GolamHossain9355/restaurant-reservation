export default function ListAllTables({ tables, clickHandler }) {
  return (
    <div className="outside-table-container">
      <div className="tables-container">
        <table className="tables-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Table Name</th>
              <th>Capacity</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.table_id}>
                <td>{table.table_id}</td>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td data-table-id-status={table.table_id}>
                  {table.reservation_id ? (
                    <>
                      Occupied{" "}
                      <button
                        data-table-id-finish={table.table_id}
                        id={table.table_id}
                        onClick={clickHandler}
                      >
                        Finish
                      </button>{" "}
                    </>
                  ) : (
                    "Free"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
