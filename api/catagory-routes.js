


// The `/api/categories` endpoint

const router = require("../../Note-Taker/routes/htmlRoutes");
const { Category } = require("../models");

router.get('/', async (req, res) => {
    //find all catagories
    //be sure to include its associated Products

    try {
        const CategoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(CategoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    //find one category by its `id` value
    //be sure to include its associated Products
    try {
        const singleCategoryData = await Category.findByPk(req.params.id, {

            include: [{ mode: Product }],
    });
    if(!singleCategoryData) {
        res.status(484).json({ message: 'No Product found with this id!'});
        return;
    }

    res.status(200).json(singleCategoryData);
} catch (err) {
    res.status(500).json(err);
}