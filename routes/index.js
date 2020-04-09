const express = require('express');

const router = express.Router();

const { userAuth ,userIsNotAuth} = require('../app/middleware/users/auth.middleware');

const { getUsers,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  postLogout,
  getUser,
  getUserId,
  deleteUserId,
  getDelId,
  userEdit,
  postAdd,
  getAdd,} = require('../app/Controllers/users/Auth.controller');
const {loginValidation,registerValidation}=require('../app/middleware/users/Validator.middleware');

const knex = require('../database/connection');

// view list users
router.get('/users', userAuth, getUsers);
// login
router.get('/login',userIsNotAuth, getLogin);
router.post('/login',[userIsNotAuth, loginValidation], postLogin);

// register
router.get('/register',userIsNotAuth, getRegister);
router.post('/register',[userIsNotAuth, registerValidation], postRegister);
// logout
router.post('/logout', userAuth, postLogout);
// view account user
router.get('/user', userAuth, getUser);
router.get('/user/:id', userAuth, getUserId);
// edit user
router.put('/edit/:id', userEdit);

// delete user
router.delete('/del/:id', userAuth, getDelId);

// add user
router.get('/add', userAuth, getAdd);
router.post('/add', userAuth, postAdd);

//create a  product_type
router.get('/product_type/add', userAuth, async function (req, res) {
  res.render('users/create_typesp', {
    title: 'product_type'
  });
})
router.post('/product_type/add', userAuth, async function (req, res) {

  await knex('Product_type').insert({
    product_type_name: req.body.product_type_name,
    user_id: req.session.id
  });
  return res.redirect('/product_type');

})
router.get('/product_type', userAuth, async function (req, res) {
 
 // const products_type =  await knex('Product_type').leftJoin('users', 'Product_type.user_id ', 'users.id');
 const products_type = await knex('product_type');
  res.render('product_type', {
    title: 'product_type',
    products_type
  });
})
// read or show product_type dungf :id

//create products
router.get('/products/add', userAuth, async function (req, res) {
  res.render('users/create_sp', {
    title: 'product'
  });
})
router.post('/products/add', userAuth, async function (req, res) {
  await knex('Products').insert({
    product_name: req.body.product_name,
    describe:req.body.describe,
    price: req.body.price,
    product_type_id: 1//i don't know this
  });

  return res.redirect('/products');

})
router.get('/products', userAuth, async function (req, res) {
 // const products =  await knex('products').leftJoin('Product_type', 'Products.product_type_id ', 'Product_type.id');
  const products = await knex('products');
  res.render('products', {
    title: 'products',
    products
  });
})
// sua tu day moi ne
router.get('/product/:id', userAuth, async (req, res) => {
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

router.delete('/del/product/:id', userAuth,  async function (req, res) {
  await knex('products')
    .where({
      id: req.params.id,
    })
    .del();
  return res.redirect('/products');
});



router.get('/product_type/:id', userAuth, async (req, res) => {
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

router.delete('/del/product_type/:id', userAuth,  async function (req, res) {
  await knex('product_type')
    .where({
      id: req.params.id,
    })
    .del();
  return res.redirect('/product_type');
});


module.exports = router;

