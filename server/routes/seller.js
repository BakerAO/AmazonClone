// access: AKIAJNLSBWVJF7EOGPCA
// secret: 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

const router = require('express').Router();
const Product = require('../models/products');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const checkJWT = require('../middlewares/check-jwt');

const s3 = new aws.S3({ accessKeyId: "AKIAJNLSBWVJF7EOGPCA", secretAccessKey: "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" });

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
    .get()
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


module.exports = router;