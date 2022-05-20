const { authJwt } = require("../middlewares");
const controller = require("../controllers/story.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/story", controller.GetStory);
  app.get("/api/story/:id", controller.GetStoryById);
  app.post("/api/story", [authJwt.verifyToken], controller.AddStory);
  app.put("/api/story/:id", [authJwt.verifyToken], controller.updateStory);
  app.delete("/api/story/:id", controller.deleteStory);
};
