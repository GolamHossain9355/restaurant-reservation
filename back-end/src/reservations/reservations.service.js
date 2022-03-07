const knex = require("../db/connection");

function list(date) {
  if (date) {
    return knex("reservations")
      .where({ reservation_date: date })
      .whereNot({status: "finished" })
      .orderBy("reservation_time");
  }
  
  return knex("reservations").orderBy("reservation_time")
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((reservation) => reservation[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .where({ reservation_id})
    .first()
}

function update(newData, reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .update(newData)
    .returning("*")
    .then((data) => data[0])
}

function destroy(reservation_id) {
  return knex("reservations").where({ reservation_id }).del()
}

module.exports = {
  list,
  create,
  read,
  update,
  delete: destroy
};
