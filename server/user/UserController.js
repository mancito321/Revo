var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const connection = require('../dbconf/conf');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// Users schema if using mongoose
// var User = require('./User');
//Get all users
router.get('/',(req,res)=>{
  connection.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
// CREATES A NEW USER
router.post('/user/register',(req,res)=>{
  connection.query(`SELECT * FROM escuela.users WHERE id= ${req.params.id};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
// router.post('/', function (req, res) {
//     User.create({
//             name : req.body.name,
//             email : req.body.email,
//             password : req.body.password
//         },
//         function (err, user) {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(user);
//         });
// });
//
// // RETURNS ALL THE USERS IN THE DATABASE

//
// // GETS A SINGLE USER FROM THE DATABASE
router.get('/user/:id',(req,res)=>{
  connection.query(`SELECT * FROM escuela.users WHERE id= ${req.params.id};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });
//
// // DELETES A USER FROM THE DATABASE
// router.delete('/:id', function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem deleting the user.");
//         res.status(200).send("User: "+ user.name +" was deleted.");
//     });
// });
//
// // UPDATES A SINGLE USER IN THE DATABASE
// router.put('/:id', function (req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//         if (err) return res.status(500).send("There was a problem updating the user.");
//         res.status(200).send(user);
//     });
// });


module.exports = router;
