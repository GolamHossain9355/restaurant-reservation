function methodNotAllowed(req, res, next) {
  return next({
    status: 405,
    msg: `${req.method} method not allowed for ${req.originalUrl}`,
  });
}

module.exports = methodNotAllowed;
