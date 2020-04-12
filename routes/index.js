const express = require('express');

const router = express.Router();

const {
  userAuth,
  userIsNotAuth
} = require('../app/middleware/users/auth.middleware');

const {
  getUsers,
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
  getAdd,
  slugify,
  getProduct_type,
  getProducts,
  getProductAdd,
  postProductAdd,
  getProductTypeAdd,
  postProductTypeAdd, 
  getProductSlug,
  editProductSlug,
  deleteProductSlug,
  getProduct_typeSlug,
  editProductTypeSlug,
  deleteProductTypeSlug,
} = require('../app/Controllers/users/Auth.controller');

const {
  loginValidation,
  registerValidation
} = require('../app/middleware/users/Validator.middleware');

const knex = require('../database/connection');
const {
  uploadMulter
} = require('../app/models/multer')
// view list users
router.get('/users', userAuth, getUsers);

// register
router.route('/register')
  .get(userIsNotAuth, getRegister)
  .post([userIsNotAuth, registerValidation], postRegister);

// login
router.route('/login')
  .get(userIsNotAuth, getLogin)
  .post([userIsNotAuth, loginValidation], postLogin);

// logout
router.post('/logout', userAuth, postLogout);
// view account user
router.get('/user', userAuth, getUser);
router.get('/user/:slug', userAuth, getUserId);
// edit user
router.put('/edit/:slug',userAuth, userEdit);

// delete user
router.delete('/del/:slug', userAuth, getDelId);

// add user
router.route('/add').get(userAuth, getAdd)
.post(userAuth, postAdd);

//create a  product_type
router.route('/product_type/add')
  .get(userAuth,getProductTypeAdd)
  .post(userAuth,postProductTypeAdd )
  //show product_type
router.get('/product_type', userAuth,getProduct_type)

router.route('/products/add')
  .get(userAuth,getProductAdd)
  .post(userAuth, uploadMulter.single('path_img'),postProductAdd)
// show products
router.get('/products', userAuth,getProducts)
// show detail product
router.get('/product/:slug', userAuth,getProductSlug);
// edit product
router.put('/edit/product/:slug', userAuth,editProductSlug);

router.delete('/del/product/:slug', userAuth,deleteProductSlug );



router.get('/product_type/:slug', userAuth, getProduct_typeSlug);
// edit product_type
router.put('/edit/product_type/:slug',userAuth,editProductTypeSlug);

// delete product_type

router.delete('/del/product_type/:slug', userAuth,deleteProductTypeSlug );


module.exports = router;