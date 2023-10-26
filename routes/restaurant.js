const express = require('express');
const router = express.Router();

const RestaurantModels = require('../models/restaurant');
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');

router.post('/add-restaurant', checkAuth, (req, res, next) => {
    RestaurantModels.find({ restaurantName: req.body.restaurantName })
        .exec()
        .then(restaurant => {
            if (restaurant >= 1) {
                return res.status(409).json({
                    message: "Restaurant already exits"
                });
            }
            else {
                const addRes = new RestaurantModels({
                    _id: new mongoose.Types.ObjectId(),
                    userId: req.body.userId,
                    restaurantName: req.body.restaurantName,
                    restaurantAddress: req.body.restaurantAddress
                });
                addRes.save().then(result => {
                    res.status(201).json({
                        message: "Restaurant Created Successfully"
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

router.get('/get-restaurant/:id', checkAuth, (req, res, next) => {
    RestaurantModels.find({ userId: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                userRestaurant: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

router.get('/getRetaurantId/:id', checkAuth, (req, res, next) => {
    RestaurantModels.findOne({ _id: req.params.id }).exec().then(
        result => {
            res.status(200).json({
                restaurant: result
            })
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
})

router.delete('/delete-restaurant/:id', checkAuth, (req, res, next) => {
    const id = req.params.id
    RestaurantModels.remove({ _id: id })
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

router.put('/update-restaurant/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    RestaurantModels.updateOne({ _id: id }, { $set: req.body })
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
});

router.get('/getRestaurant', (req, res, next) => {
    RestaurantModels.find()
        .exec()
        .then(result => {
            res.status(200).json({
                restaurant: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;