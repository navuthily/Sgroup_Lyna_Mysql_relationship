const express = require('express');

const router = express.Router();

const authmiddleware = require('../app/middleware/users/auth.middleware');

const authControllers = require('../app/Controllers/users/Auth.controller');

 const knex = require('../database/connection');

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
// edit user
// router.put('/user:id',authControllers.puteituser)
router.put('/edit/:id',  authControllers.userEdit);

// delete user
// ta dang sua cai nay ne
router.delete('/del/:id', authControllers.getDelId);

// add user
router.get('/add', authmiddleware.userAuth, authControllers.getAdd);
router.post('/add', authmiddleware.userAuth, authControllers.postAdd);






//create a type product
router.get('/product-type/add',async function (req,res) {
  const products_type = await knex('Product_type');

  res.render('users/product_type', {
    title: 'product_type',
    products_type,
  });
  })
module.exports = router;
