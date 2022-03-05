export default function ListAllTables({ tables }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.table_id}>
              <td>{table.table_id}</td>
              <td>{table.table_name}</td>
              <td>{table.capacity}</td>
              <td data-table-id-status={table.table_id}>
                {table.reservation_id ? "Occupied" : "Free"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
