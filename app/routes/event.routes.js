const { authJwt } = require("../middlewares");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/event", controller.GetEvent);
  app.get(
    "/api/event/:id",
    controller.GetEventById
  );
  app.post("/api/event", [authJwt.verifyToken], controller.AddEvent);
  app.put(
    "/api/event/:id",
    [authJwt.verifyToken],
    controller.updateEvent
  );
  app.delete(
    "/api/event/:id",
    controller.deleteEvent
  );
};
