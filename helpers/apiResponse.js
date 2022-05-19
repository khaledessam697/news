exports.successResponse = function (res, msg) {
  let data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  let resData = {
    status: 1,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  let data = {
    status: 0,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.ErrorResponseWithData = function (res, msg, data) {
  let data_ = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(200).json(data_);
};

exports.notFoundResponse = function (res, msg) {
  let data = {
    status: 0,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  let resData = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  let data = {
    status: 0,
    message: msg,
  };
  return res.status(200).json(data);
};
