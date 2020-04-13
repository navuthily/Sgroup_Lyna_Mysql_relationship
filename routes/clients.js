const express = require('express');

const router = express.Router();

const {
  userAuth,
  userIsNotAuth,
} = require('../app/Clients/Auth/middleware/auth.middleware');

const {
  getUsers,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  postLogout,
  getUser,
  getUserId,
 getDelId,
  userEdit,
  postAdd,
  getAdd,
 
} = require('../app/Clients/Auth/Controllers/users/Auth.controller');
const { getProductType,
  getProducts,
  getProductAdd,
  postProductAdd,
  getProductTypeAdd,
  postProductTypeAdd,
  getProductSlug,
  editProductSlug,
  deleteProductSlug,
  getProductTypeSlug,
  editProductTypeSlug,
  deleteProductTypeSlug,}=require('../app/Clients/Products/Controller/Product.controller')
const {
  loginValidation,
  registerValidation,
} = require('../app/Clients/Auth/middleware/Validator.middleware');


const {
  uploadMulter,
} = require('../app/Clients/Products/models/multer');
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
router.put('/edit/:slug', userAuth, userEdit);

// delete user
router.delete('/del/:slug', userAuth, getDelId);

// add user
router.route('/add').get(userAuth, getAdd)
.post(userAuth, postAdd);

// create a  product_type
router.route('/product_type/add')
  .get(userAuth, getProductTypeAdd)
  .post(userAuth, postProductTypeAdd);
  // show product_type
router.get('/product_type', userAuth, getProductType);

router.route('/products/add')
  .get(userAuth, getProductAdd)
  .post(userAuth, uploadMulter.single('path_img'), postProductAdd);
// show products
router.get('/products', userAuth, getProducts);
// show detail product
router.get('/product/:slug', userAuth, getProductSlug);
// edit product
router.put('/edit/product/:slug', userAuth, editProductSlug);

router.delete('/del/product/:slug', userAuth, deleteProductSlug);


router.get('/product_type/:slug', userAuth, getProductTypeSlug);
// edit product_type
router.put('/edit/product_type/:slug', userAuth, editProductTypeSlug);

// delete product_type

router.delete('/del/product_type/:slug', userAuth, deleteProductTypeSlug);


module.exports = router;
