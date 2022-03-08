const knex = require("../db/connection");

function list(reservation_date) {
  if (reservation_date) {
    return knex("reservations")
      .where({ reservation_date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  }

  return knex("reservations").orderBy("reservation_time");
}

function listMatchingMobile(mobile_number) {
  return knex("reservations")
    .where( "mobile_number", "like", `%${mobile_number}%` )
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((reservation) => reservation[0]);
}

function read(reservation_id) {
  return knex("reservations").where({ reservation_id }).first();
}

function update(newData, reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .update(newData)
    .returning("*")
    .then((data) => data[0]);
}

function destroy(reservation_id) {
  return knex("reservations").where({ reservation_id }).del();
}

module.exports = {
  list,
  listMatchingMobile,
  create,
  read,
  update,
  delete: destroy,
};
