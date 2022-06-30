const { authJwt } = require("../middlewares");
const controller = require("../controllers/video.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/videos", controller.GetVideo);
  app.get("/api/video/:id", controller.GetVideoById);
  app.post("/api/video", /*[authJwt.verifyToken],*/ controller.AddVideo);
  app.put("/api/video/:id", /*[authJwt.verifyToken],*/ controller.updateVideo);
  app.delete("/api/video/:id", controller.deleteVideo);
};
