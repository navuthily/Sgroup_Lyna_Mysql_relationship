const bcrypt = require('bcrypt');
const knex = require('../../../database/connection');

const getUsers = async function (req, res) {
  const users = await knex('users');
  const user = users.find((result) => (result = req.session));
  res.render('users/users', {
    title: 'Users',
    user,
    users,
  });
};
const getLogin = async function (req, res) {
  return res.render('users/login', {
    title: 'Login',
  });
};
const postLogin = async function (req, res) {
  const {
    email,
    password,
  } = req.body;
  const user = await knex('users')
    .where({
      email,
    })
    .select('*')
    .first();
  if (user) {
    const result = bcrypt.compareSync(password, user.password);
    console.log(user.password);
    console.log(result);
    if (!user.password) {
      return res.redirect('/login');
    }
    req.session.user = user;
    req.body.user = user;

    return res.redirect('/user');
  } res.send('Tài khoản không tồn tại');
};
const getRegister = function (req, res) {
  return res.render('users/register', {
    title: 'Register',
  });
};
const postRegister = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await knex('users').insert({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  return res.redirect('/login');
};
const postLogout = function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
};
const getUser = function (req, res, next) {
  res.render('users/user');
};
const getUserId = async function (req, res) {
  const user = await knex('users')
    .where({
      id: req.params.id,
    })
    .select('*')
    .first();

  return res.render('userprofile', {
    user,
  });
};

// edit user
const userEdit = async (req, res) => {
  await knex('users')
    .where({
      id: req.params.id,
    })
    .update({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,

    });
  return res.redirect('/users');
};
// delete user
const deleteUserId = async function (req, res) {
  await knex('users')
    .where({
      id: req.params.id,
    }, true)
    .del();
  return res.redirect('/users');
};
const getDelId = async function (req, res) {
  await knex('users')
    .where({
      id: req.params.id,
    })
    .del();
  return res.redirect('/users');
};

const puteituser = async function (req, res) {
  await knex('users')
    .where({
      id: req.params.id,
    })
    .update({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
    });
  return res.redirect('/users');
};
// add user
const getAdd = function (req, res) {
  return res.render('users/register', {
    title: 'Add',
  });
};
const postAdd = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await knex('users').insert({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  return res.redirect('/users');
};
module.exports = {
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
  puteituser,
  postAdd,
  getAdd,
};
