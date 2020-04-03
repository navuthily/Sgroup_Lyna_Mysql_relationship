const bcrypt = require('bcrypt');
const knex = require('../../../database/connection');

const getUsers = async (req, res) => {
  const users = await knex('users');

  res.render('users/users', {
    title: 'Users',
    users,
  });
};

const getLogin = async (req, res) => res.render('users/login', {
  title: 'Login',
});
const postLogin = async (req, res) => {
  const {
    email,
  } = req.body;
  const user = await knex('users')
    .where({
      email,
    })
    .select('*')
    .first();
  if (user) {
    if (!user.password) {
      res.redirect('/login');
    }
    req.session.user = user;
    req.body.user = user;

    res.redirect('/user');
  }
  res.send('Tài khoản không tồn tại');
};
const getRegister = (req, res) => res.render('users/register', {
  title: 'Register',
});
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
const postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/login');
  });
};
const getUser = (req, res) => {
  res.render('users/user');
};
// ko hieu noi cho nay
const getUserId = async (req, res) => {
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
