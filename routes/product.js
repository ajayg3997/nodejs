const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
    dest: 'tmp/'
});


router.post('/add-product', upload.single('file'), checkAuth, (req, res, next) => {
    Product.find({ productName: req.body.productName })
        .exec()
        .then(restaurant => {
            if (restaurant >= 1) {
                return res.status(409).json({
                    message: "Product already exits"
                });
            }
            else {
                const product = new Product({
                    _id: new mongoose.Types.ObjectId(),
                    userId: req.body.userId,
                    restaurantId: req.body.restaurantId,
                    productName: req.body.productName,
                    productPrice: req.body.productPrice,
                    productDec: req.body.productDec,
                    productImg: req.file.path
                });
                product.save().then(result => {
                    res.status(200).json({
                        message: "Product Added Successfully"
                    })
                })
                    .catch(error => {
                        res.status(500).json({
                            error: error
                        });
                    });
            }
        })
        .catch()
});

router.get('/getProductByUser/:id', checkAuth, (req, res, next) => {
    Product.find({ userId: req.params.id })
        .exec()
        .then(result => {
            result?.forEach((element, index) => {
                result[index].productImg = `http://localhost:8000/${result[index].productImg}`
            })
            res.status(200).json({
                productDetail: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

router.get('/getProductByProduct/:id', checkAuth, (req, res, next) => {
    Product.find({ _id: req.params.id })
        .exec()
        .then(result => {
            result?.forEach((element, index) => {
                result[index].productImg = `http://localhost:8000/${result[index].productImg}`
            })
            res.status(200).json({
                productDetail: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
})


router.delete('/delete-product/:id', checkAuth, (req, res, next) => {
    const id = req.params.id
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                result: result,
                message: "Record deleted Successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});


router.put('/update-product/:id', upload.single('file'), checkAuth,  (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate({ _id: id }, {
        $set: {
            userId: req.body.userId,
            restaurantId: req.body.restaurantId,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productDec: req.body.productDec,
            productImg:req.file.path
        }
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Record Update Successfully"
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
})

router.get('/getProduct', (req, res, next) => {
    Product.find()
        .exec()
        .then(result => {
            result?.forEach((element, index) => {
                result[index].productImg = `http://localhost:8000/${result[index].productImg}`
            })
            res.status(200).json({
                product: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;