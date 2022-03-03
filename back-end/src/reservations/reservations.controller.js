/**
 *  List handler for reservation resources
 *  new to test
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

function createReservationDateWithTime(date, time) {
  return new Date(
    date.slice(0, 4),
    date.slice(5, 7) - 1,
    date.slice(8),
    time.slice(0, 2),
    time.slice(3)
  );
}

function validateFields(req, res, next) {
  const { data = {} } = req.body;

  if (data["reservation_date"]) {
    if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/g)) {
      return next({
        status: 400,
        message: `reservation_date does not match the pattern`,
      });
    }
  }

  if (
    data["reservation_time"] &&
    !data["reservation_time"].match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  ) {
    return next({
      status: 400,
      message: `reservation_time does not match pattern`,
    });
  }

  if (data["people"] && typeof data["people"] !== "number") {
    return next({
      status: 400,
      message: `people is not a number`,
    });
  }

  requiredFields.map((field) => {
    if (!data[field]) {
      return next({
        status: 400,
        message: `Required field: ${field} is missing`,
      });
    }
  });

  let multiAlerts = [];
  const present = new Date();
  const reservationDate = createReservationDateWithTime(
    data["reservation_date"],
    data["reservation_time"]
  );

  if (reservationDate < present)
    multiAlerts.push(
      "The reservation date is in the past. Only future reservations are allowed"
    );

  if (reservationDate.getDay() === 2)
    multiAlerts.push(`The restaurant is closed on Tuesdays`);

  if (multiAlerts.length > 0) {
    return next({
      status: 400,
      message: multiAlerts,
    });
  }

  next();
}

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.status(200).json({ data });
}

async function create(req, res) {
  const { data = {} } = req.body;
  const newData = await service.create(data);
  res.status(201).json({ data: newData });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(validateFields), asyncErrorBoundary(create)],
};
