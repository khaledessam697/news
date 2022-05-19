const validationHandler = () => {
  return (errSchema, req, res, next) => {
    if (!errSchema.validationErrors) {
      next(errSchema);
      return;
    }

    const status = 422;
    const message = 'Validation failed';
    let response = {
      success: false,
      message: message,
      validationErrors: errSchema.validationErrors,
      code: status,
    };

    if (errSchema.oldInputexists) {
      response.data = errSchema.oldInput;
    }

    // logger.info(response);

    response.level = undefined;
    response.service = undefined;

    return res.status(status).json(response);
  };
};
module.exports = {
  validationHandler,
};
