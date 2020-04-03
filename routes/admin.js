const express = require('express');

const router = express.Router();

const authmiddleware = require('../app/middleware/admin/auth.middleware');

const authControllers = require('../app/Controllers/admin/Auth.controller');

// const knex = require('../database/connection');

// view list users
router.get('/users', authmiddleware.userAuth, authControllers.getUsers);
// login
router.get('/login', authControllers.getLogin);
router.post('/login', authControllers.postLogin);

// register
router.get('/register', authControllers.getRegister);
router.post('/register', authControllers.postRegister);
// logout
router.post('/logout', authmiddleware.userAuth, authControllers.postLogout);
// view account user
router.get('/user', authmiddleware.userAuth, authControllers.getUser);
router.get('/user/:id', authmiddleware.userAuth, authControllers.getUserId);

router.delete('/user/:id', authControllers.deleteUserId);
// edit user
// router.put('/user:id',authControllers.puteituser)
router.post('/edit/:id', authmiddleware.userAuth, authControllers.userEdit);

// delete user
router.get('/del/:id', authmiddleware.userAuth, authControllers.getDelId);

// add user
router.get('/add', authmiddleware.userAuth, authControllers.getAdd);
router.post('/add', authmiddleware.userAuth, authControllers.postAdd);
module.exports = router;
