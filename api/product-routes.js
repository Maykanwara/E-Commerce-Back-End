const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// The `/api/products` endpoint

// get all products
router.get('/', async (req,res) => {
    //find all products
    //be sure to include its associated Category anf Tag data

    try {
        const ProductData = await Product.FindAll()
        include: [{ model: Category }, { model:Tag,  through: ProductTag }],
    });
    res.status(200).json(ProductData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one product
router.get(':id, async (req,res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
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
        res.stutus(500).json(err);
    }
});

//create new product
router.post('/',(req,res) => {
    /* req.body should look like this.....
    
        "product_name": "Basketball",
        "price": "200.00",
        "stock" : "3" ,
        "category_id" : "4" ,
        "tagIds" : [1, 2, 3, 4]
    }  

*/

    Product.create(req.body)
    .then((product) => {
        //if there's product tags,we need to crate pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });

            return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just response
        res.status(200).json(product);
    })
    .then(productTagIds) => res.status(200).json(productTagIds))
    .catch(err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req. res) => {
    // update product data
        /*req.body should look like this....
        {
            tagIds [1, 2, 3, 4]
        }
    */
   Product.update(req.body, {
       where: {
           id: req.params.id,
       },
   })
        .then((product) => {

        })
}





