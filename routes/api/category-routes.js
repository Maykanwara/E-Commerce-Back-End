const router = require("express").Router();
const { Category } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ mode: Product }],
    });
    if (!singleCategoryData) {
      res.status(484).json({ message: "No Product found with this id!" });
      return;
    }

    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
