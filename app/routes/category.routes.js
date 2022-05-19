const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/category/:id", controller.GetCategoryById);
  app.post("/api/category", controller.AddCategory);
  app.put("/api/category/:id", controller.updateCategory);
  app.delete("/api/category/:id", controller.deleteCategory);
};
