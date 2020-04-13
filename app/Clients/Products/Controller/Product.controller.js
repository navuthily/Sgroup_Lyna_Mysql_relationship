const slugify = require('slugify');
const knex = require('../../../../database/connection');
// get product_type
const getProductType = async (req, res) => {
  const productsType = await knex('Product_type').leftJoin('users', 'Product_type.user_id ', 'users.id')
    .select('product_type.id as id',
      'product_type_name',
      'username',
      'product_type.slug as slug');
  res.render('products/product_type', {
    title: 'product_type',
    productsType,
  });
};

const getProducts = async (req, res) => {
  const products = await knex('products')
    .leftJoin('users', 'products.user_id', 'users.id')
    .leftJoin('Product_type', 'Products.product_type_id ', 'Product_type.id')
    .select('products.id as id',
      'product_name',
      'price',
      'describe',
      'product_type_name',
      'username', 'path_img', 'products.slug as slug');

  res.render('products/viewsp', {
    title: 'products',
    products,
  });
};

const getProductAdd = async (req, res) => {
  res.render('products/create_sp', {
    title: 'product',
  });
};
const postProductAdd = async (req, res) => {
  const {
    originalname,
  } = req.file;
  await knex('Products').insert({

    product_name: req.body.product_name,
    describe: req.body.describe,
    price: req.body.price,
    product_type_id: req.body.product_type_id,
    user_id: req.session.user.id,
    path_img: originalname,
    slug: slugify(req.body.product_name + Date.now()),

  });

  return res.redirect('/products');
};
const getProductTypeAdd = async (req, res) => {
  res.render('products/create_typesp', {
    title: 'product_type',
  });
};
const postProductTypeAdd = async (req, res) => {
  await knex('Product_type').insert({
    user_id: req.session.user.id,
    product_type_name: req.body.product_type_name,
    slug: slugify(req.body.product_type_name + Date.now()),

  });
  return res.redirect('/product_type');
};
const getProductSlug = async (req, res) => {
  const product = await knex('products')
    .where({
      slug: req.params.slug,
    })
    .select('*')
    .first();
  return res.render('products/view_product_by_params', {
    product,
  });
};
const editProductSlug = async (req, res) => {
  await knex('products').where({
    slug: req.params.slug,
  }).update({
    product_name: req.body.product_name,
    describe: req.body.describe,
    price: req.body.price,
    slug: slugify(req.body.product_name + Date.now()),
  });
  return res.redirect('/products');
};
const deleteProductSlug = async (req, res) => {
  await knex('products')
    .where({
      slug: req.params.slug,
    })
    .del();
  return res.redirect('/products');
};

const getProductTypeSlug = async (req, res) => {
  const productType = await knex('product_type')
    .where({
      slug: req.params.slug,
    })
    .select('*')
    .first();

  return res.render('products/view_product_type_by_params', {
    productType,
  });
};
const editProductTypeSlug = async (req, res) => {
  await knex('product_type').where({
    slug: req.params.slug,
  }).update({
    product_type_name: req.body.product_type_name,
    slug: slugify(req.body.product_type_name + Date.now()),
  });
  return res.redirect('/products/product_type');
};
const deleteProductTypeSlug = async (req, res) => {
  await knex('product_type')
    .where({
      slug: req.params.slug,
    })
    .del();
  return res.redirect('/product_type');
  };
module.exports = {
  getProductType,
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
  deleteProductTypeSlug,
};
