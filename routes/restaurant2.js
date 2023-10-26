const express = require('express');
const router = express.Router();
const connection = require('../db');
const checkAuth = require('../middleware/check-auth');

router.post('/add-restaurant', checkAuth, (req, res, next) => {
    connection.query('SELECT * FROM resturant', (error, results, fields) => {
        let checkDublicate = results.find(x => x.restaurantName == req.body.restaurantName);
        console.log(checkDublicate)
        if (!checkDublicate) {
            const data = {
                userId: req.body.userId,
                restaurantName: req.body.restaurantName,
                restaurantAddress: req.body.restaurantAddress
            };
            connection.query('INSERT INTO resturant SET ?', data, function (error, results, fields) {
                if (error) throw error;
                res.status(200).json({
                    message: "Restaurant Created Successfully"
                })
            });
        }
        else {
            res.status(403).json({
                message: "Restaurant Already Exists"
            })
        }
    })
});

router.get('/getRestaurant', (req, res, next) => {
    connection.query('SELECT * FROM resturant', (error, results, fields) => {
        if (results) {
            res.status(200).json({
                restaurant: results
            })
        }
        else {
            res.status(403).json({
                message: "Restaurant Not Found"
            })
        }
    })
});

router.get('/getrestaurantByUser/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM resturant WHERE userId="${id}"`, (error, results, fields) => {
        console.log(results)
        if (results) {
            res.status(200).json({
                userRestaurant: results
            })
        }
        else {
            res.status(403).json({
                message: "Restaurant Not Found"
            })
        }
    })
});

router.get('/get-restaurant/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM resturant WHERE _id="${id}"`, (error, results, fields) => {
        console.log(results)
        if (results) {
            res.status(200).json({
                restaurant: results
            })
        }
        else {
            res.status(403).json({
                message: "Restaurant Not Found"
            })
        }
    })
});

router.put('/update-restaurant/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    connection.query(`UPDATE resturant SET  userId = "${req.body.userId}",
    restaurantName = "${req.body.restaurantName}", restaurantAddress = "${req.body.restaurantAddress}" WHERE _id=${id}`, (error, results, fields) => {
        if (results) {
            res.status(200).json({
                message: "Record Update Successfully"
            })
        }
        else {
            res.status(500).json({
                error: error
            });
        }
    });
});


router.delete('/delete-restaurant/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    connection.query(`DELETE FROM resturant WHERE _id=${id}`, (error, results, fields) => {
        if (results) {
            res.status(200).json({
                result: results,
                message: "Record deleted Successfully"
            });
        }
        else {
            res.status(500).json({
                error: error
            });
        }
    });
});

module.exports = router;