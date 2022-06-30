const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/post/search", controller.GetPostsByCategory);
  app.get("/api/post", controller.GetPost);
  app.get("/api/post/:id", controller.GetPostById);
  app.post("/api/post",/* [authJwt.verifyToken],*/ controller.AddPost);
  app.put("/api/post/:id",/* [authJwt.verifyToken],*/ controller.updatePost);
  app.delete("/api/post/:id", controller.deletePost);
};
