const { Router } = require("express");
const {
  getCategoryHandler,
  newCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("../handlers/categoryHandler");

const categoryRouter = Router();

categoryRouter.get("/", getCategoryHandler);
categoryRouter.post("/new", newCategoryHandler);
categoryRouter.put("/change/:id", updateCategoryHandler);
categoryRouter.delete("/delete/", deleteCategoryHandler);

module.exports = categoryRouter;
