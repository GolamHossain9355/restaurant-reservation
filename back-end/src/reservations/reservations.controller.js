/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const requiredFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

async function validateFields(req, res, next) {
  const { data = {} } = req.body;

  if (data["reservation_date"] && !data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/g)) {
    return next({ 
      status: 400,
      message: `reservation_date does not match the pattern`
    })
  }
  if (data["reservation_time"] && !data["reservation_time"].match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
    return next({ 
      status: 400,
      message: `reservation_time does not match pattern`
    })
  }
  if (data["people"] && typeof data["people"] !== "number") {
    return next({ 
      status: 400,
      message: `people is not a number`
    })
  }
  requiredFields.map((field) => {
    if (!data[field]) {
      return next({ 
        status: 400,
        message: `Required field: ${field} is missing`
      })
    }
  });

  next()
}

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.status(200).json({ data });
}

async function create(req, res, next) {
  const { data = {} } = req.body;
  const newData = await service.create(data);
  res.status(201).json({ data: newData });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(validateFields), asyncErrorBoundary(create)],
};
