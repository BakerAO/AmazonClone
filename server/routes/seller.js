// access: AKIAJNLSBWVJF7EOGPCA
// secret: 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

const router = require('express').Router();
const Product = require('../models/product');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const checkJWT = require('../middlewares/check-jwt');
const faker = require('faker');

const s3 = new aws.S3({ accessKeyId: "AKIAJNLSBWVJF7EOGPCA", secretAccessKey: "pwHXl5OqHvWu4iLilxbGfTCAagLruG8XMIKrtwyH" });

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'amazonoproject',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldName });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});

router.route('/products')
    .get(checkJWT, (req, res, next) => {
        Product.find({ owner: req.decoded.user._id })
            .populate('owner')
            .populate('category')
            .exec((err, products) => {
                if(products) {
                    res.json({
                        success: true,
                        message: "Products",
                        products: products
                    });
                }
            });
    })
    .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
        let product = new Product();
        product.owner = req.decoded.user._id;
        product.category = req.body.categoryId;
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.file.location;
        product.save();
        res.json({
            success: true,
            message: 'Successfully added the product.'
        });
    })
;

router.get('/faker/test', (req, res, next) => {
    for(i = 0; i < 20; i++) {
        let product = new Product();
        product.category = "5acfc25315bafe4390a2dfd7";
        product.owner = "5ab512b492c139065ccbba35";
        product.image = faker.image.cats();
        product.title = faker.commerce.productName();
        product.description = faker.lorem.words();
        product.price = faker.commerce.price();
        product.save();
    }

    res.json({
        message: "Successfully added 20 cat pictures"
    });
});

module.exports = router;