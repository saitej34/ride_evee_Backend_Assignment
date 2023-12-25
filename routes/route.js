const express = require('express');
const router = express.Router();
const addUser = require('../controllers/addUser')
const getUsers = require('../controllers/getUsers')
const getUserById = require('../controllers/getUserById');
const authenticateUser = require('../controllers/authenticateUser')
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser')

router.post('/users',addUser);

router.get('/users',getUsers);

router.get('/users/:id',getUserById);

router.put('/users/:id',authenticateUser,updateUser)

router.delete('/users/:id',authenticateUser,deleteUser);



module.exports = router;