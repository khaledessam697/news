const { authJwt } = require("../middlewares");
const controller = require("../controllers/eventPost.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/event-post", controller.GetEventPost);
  app.get("/api/event-post/search", controller.GetEventPostByEvent);
  app.get("/api/event-post/:id", controller.GetEventPostById);
  app.post("/api/event-post", [authJwt.verifyToken], controller.AddEventPost);
  app.put(
    "/api/event-post/:id",
    [authJwt.verifyToken],
    controller.updateEventPost
  );
  app.delete("/api/event-post/:id", controller.deleteEventPost);
};
