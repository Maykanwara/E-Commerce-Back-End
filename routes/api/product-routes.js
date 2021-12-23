const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



router.get('/', async (req,res) => {
    

    try {
        const ProductData = await Product.FindAll({
        include: [{ model: Category }, { model:Tag,  through: ProductTag }],
    });
    res.status(200).json(ProductData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get(':id, async ( req,res) => {
    
    try  {
        const singleProductData = await Product.findByPk(req.params.id, {

            include: [{ model: Category}, {model: Tag, though: ProductTag, as: 'products_tagged' }],
    });

    if (!singleProductData) {
        res.status(484).json({ message: 'No Product found with this id!'});
        return;
    }


    res.status(200).json(singleProductData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/',(req,res) => {
    

    Product.create(req.body)
    .then((product) => {
        
        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });

            return ProductTag.bulkCreate(productTagIdArr);
        }
       
        res.status(200).json(product);
    })
    .then(productTagIds) => res.status(200).json(productTagIds))
    .catch(err) => {
        console.log(err);
        res.status(400).json(err);
    });
});


router.put('/:id', (req. res) => {
    
   Product.update(req.body, {
       where: {
           id: req.params.id,
       },
   })
        .then((product) => {

        })
}





