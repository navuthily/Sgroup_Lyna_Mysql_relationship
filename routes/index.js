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
router.put('/edit/:id', authControllers.userEdit);

// delete user
router.delete('/del/:id', authmiddleware.userAuth, authControllers.getDelId);

// add user
router.get('/add', authmiddleware.userAuth, authControllers.getAdd);
router.post('/add', authmiddleware.userAuth, authControllers.postAdd);

//create a  product_type
router.get('/product_type/add', authmiddleware.userAuth, async function (req, res) {
  res.render('users/create_typesp', {
    title: 'product_type'
  });
})
router.post('/product_type/add', authmiddleware.userAuth, async function (req, res) {

  await knex('Product_type').insert({
    product_type_name: req.body.product_type_name,
    user_id: req.session.id
  });
  return res.redirect('/product_type');

})
router.get('/product_type', authmiddleware.userAuth, async function (req, res) {
 
 // const products_type =  await knex('Product_type').leftJoin('users', 'Product_type.user_id ', 'users.id');
 const products_type = await knex('product_type');
  res.render('product_type', {
    title: 'product_type',
    products_type
  });
})
// read or show product_type dungf :id

//create products
router.get('/products/add', authmiddleware.userAuth, async function (req, res) {
  res.render('users/create_sp', {
    title: 'product'
  });
})
router.post('/products/add', authmiddleware.userAuth, async function (req, res) {
  await knex('Products').insert({
    product_name: req.body.product_name,
    describe:req.body.describe,
    price: req.body.price,
    product_type_id: 1//i don't know this
  });

  return res.redirect('/products');

})
router.get('/products', authmiddleware.userAuth, async function (req, res) {
 // const products =  await knex('products').leftJoin('Product_type', 'Products.product_type_id ', 'Product_type.id');
  const products = await knex('products');
  res.render('products', {
    title: 'products',
    products
  });
})
// sua tu day moi ne
router.get('/product/:id', authmiddleware.userAuth, async (req, res) => {
  const product = await knex('products')
    .where({
      id: req.params.id,
    })
    .select('*')
    .first();

  return res.render('view_product_by_params', {
    product,
  });
});
// edit user
router.put('/edit/product/:id', async (req, res) => {
  await knex('users').where({
    id: req.params.user_id,
  }).update({
    product_name:req.body.product_name,
    describe:req.body.describe,
    price: req.body.price
  });
  return res.redirect('/products');
});

// delete user
// ta dang sua cai nay ne
router.delete('/del/product/:id', authmiddleware.userAuth,  async function (req, res) {
  await knex('products')
    .where({
      id: req.params.id,
    })
    .del();
  return res.redirect('/products');
});


// moi ne
router.get('/product_type/:id', authmiddleware.userAuth, async (req, res) => {
  const product_type = await knex('product_type')
    .where({
      id: req.params.id,
    })
    .select('*')
    .first();

  return res.render('view_product_type_by_params', {
    product_type,
  });
});
// edit user
router.put('/edit/product_type/:id', async (req, res) => {
  await knex('product_type').where({
    id: req.params.user_id,
  }).update({
    product_type_name:req.body.product_type_name,
  });
  return res.redirect('/product_type');
});

// delete user
// ta dang sua cai nay ne
router.delete('/del/product_type/:id', authmiddleware.userAuth,  async function (req, res) {
  await knex('product_type')
    .where({
      id: req.params.id,
    })
    .del();
  return res.redirect('/product_type');
});
// bat dau cai moi ne

//tiếp nữa nè

module.exports = router;

