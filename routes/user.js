const express = require('express');
const router = express.Router();

const UserModels = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
    UserModels.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail already exits"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new UserModels({
                            _id: new mongoose.Types.ObjectId(),
                            isAdmin: req.body.isAdmin,
                            userName: req.body.userName,
                            email: req.body.email,
                            address: req.body.address,
                            password: hash
                        });
                        user.save().then(result => {
                            res.status(201).json({
                                message: 'User Created Successfully'
                            })
                        }
                        )
                            .catch(error => {
                                res.status(500).json({
                                    error: error
                                });
                            });
                    }
                });
            }
        })
        .catch()
});


router.post("/login", (req, res, next) => {
    UserModels.find({ email: req.body.email })
        .exec()
        .then(loginUser => {
            if (loginUser.length < 1) {
                return res.status(404).json({
                    message: "User does not exist"
                });
            }
            bcrypt.compare(req.body.password, loginUser[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "User does not exist"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: loginUser[0].email,
                        userId: loginUser[0]._id
                    }, 'secret', {
                        expiresIn: '5h'
                    });

                    let userDetail = {
                        _id: loginUser[0]._id,
                        email: loginUser[0].email,
                        userName: loginUser[0].userName,
                        address: loginUser[0].address,
                        isAdmin: loginUser[0].isAdmin,
                    }
                    return res.status(200).json({
                        message: "Login Successful",
                        token: token,
                        userDetail: userDetail
                    })
                }
                res.status(401).json({
                    message: "User does not exist"
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});



module.exports = router;