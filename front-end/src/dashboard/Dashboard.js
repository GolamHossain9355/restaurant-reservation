import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import {
   listReservations,
   listTables,
   clearTableAssignment,
} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"
import ListAllReservations from "../reservations/ListAllReservations"
import ListAllTables from "../tables/ListAllTables"
import { previous, next, today } from "../utils/date-time"
import "../layout/Layout.css"

/**
 * Defines the dashboard page.
 *
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
   const [reservations, setReservations] = useState([])
   const [tables, setTables] = useState([])
   const [reservationsError, setReservationsError] = useState(null)
   const history = useHistory({})

   useEffect(() => {
      const defaultTable = {
         first_name: "",
         last_name: "",
         mobile_number: "",
         reservation_date: "",
         reservation_time: "",
         people: "",
         status: "",
      }
      const abortController = new AbortController()
      setReservationsError(null)
      async function loadReservations() {
         try {
            const data = await listReservations(date, abortController.signal)
            data.length <= 5
               ? setReservations([
                    ...data,
                    ...new Array(5 - data.length).fill(defaultTable),
                 ])
               : setReservations(data)
         } catch (error) {
            setReservationsError(error)
         }
      }
      loadReservations()
      return () => abortController.abort()
   }, [date])

   useEffect(() => {
      const abortController = new AbortController()
      setReservationsError(null)
      async function loadTables() {
         try {
            const data = await listTables(abortController.signal)
            setTables(data)
         } catch (error) {
            setReservationsError(error)
         }
      }
      loadTables()
      return () => abortController.abort()
   }, [])

   const clickHandlerFinishBTN = ({ target }) => {
      const abortController = new AbortController()
      setReservationsError(null)
      const defaultTable = {
         first_name: "",
         last_name: "",
         mobile_number: "",
         reservation_date: "",
         reservation_time: "",
         people: "",
         status: "",
      }

      async function clearAssignment() {
         try {
            await clearTableAssignment(target.id, abortController.signal)
            const tableData = await listTables(abortController.signal)
            const reservationData = await listReservations(
               date,
               abortController.signal
            )
            reservationData.length <= 5
               ? setReservations([
                    ...reservationData,
                    ...new Array(5 - reservationData.length).fill(defaultTable),
                 ])
               : setReservations(reservationData)
            setTables(tableData)
         } catch (error) {
            setReservationsError(error)
         }
      }

      const confirm = window.confirm(
         "Is this table ready to seat new guests? \n\n This cannot be undone."
      )

      if (confirm) {
         clearAssignment()
      }
      return () => abortController.abort()
   }

   const clickHandler = (event) => {
      if (event.target.name === "previous") {
         history.push(`/dashboard?date=${previous(date)}`)
      }
      if (event.target.name === "today") {
         history.push(`/dashboard?date=${today()}`)
      }
      if (event.target.name === "next") {
         history.push(`/dashboard?date=${next(date)}`)
      }
   }
   let buttonClassForToday = "button"

   if (date === today()) buttonClassForToday = "disabled"

   return (
      <main>
         <ErrorAlert error={reservationsError} />
         <div className="header">
            <h1>Dashboard</h1>
            <h4 className="mb-0">Reservations for {date}</h4>
            <div className="button-dashboard">
               <button
                  type="button"
                  className="button"
                  name="previous"
                  onClick={clickHandler}
               >
                  Previous
               </button>{" "}
               <button
                  type="button"
                  className={`${buttonClassForToday}`}
                  name="today"
                  onClick={clickHandler}
               >
                  Today
               </button>{" "}
               <button
                  type="button"
                  className="button"
                  name="next"
                  onClick={clickHandler}
               >
                  Next
               </button>
            </div>
         </div>
         <hr />
         <div className="reservationsTables">
            <ListAllTables
               tables={tables}
               clickHandler={clickHandlerFinishBTN}
            />
            <ListAllReservations
               reservations={reservations}
               date={date}
               setReservations={setReservations}
            />
         </div>
      </main>
   )
}

export default Dashboard
