const { authJwt,verifyCategory } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/category", controller.GetCategory);
  app.get(
    "/api/category/:id",
    controller.GetCategoryById
  );
  app.post("/api/category", [authJwt.verifyToken,verifyCategory.checkDuplicateCategory], controller.AddCategory);
  app.put(
    "/api/category/:id",
    [authJwt.verifyToken],
    controller.updateCategory
  );
  app.delete(
    "/api/category/:id",
    controller.deleteCategory
  );
};