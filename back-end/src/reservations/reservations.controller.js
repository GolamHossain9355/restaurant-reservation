/**
 * List handler for reservation resources
 */
const service = require('./reservations.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await service.list()
  res.status(200).json({data})
}

async function create(req, res, next) {
  const {data = {}} = req.body
  const reservation = {
    ...data,
  }
  const newData = await service.create(reservation)
  res.status(201).json({data: newData})
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create)
};
