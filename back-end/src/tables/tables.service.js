const knex = require("../db/connection");

function list() {
  return knex("tables").orderBy("table_name");
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((data) => data[0]);
}

function read(table_id) {
  return knex("tables").where({ table_id }).first()
}

function update(table, table_id) {
  return knex("tables")
    .where({ table_id })
    .update(table)
    .returning("*")
    .then((data) => data[0])
}

module.exports = {
  list,
  create,
  read,
  update
};
