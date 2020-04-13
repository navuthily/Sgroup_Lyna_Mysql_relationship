const saltRounds = 10;
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const knex = require('../../../../../database/connection');

const getUsers = async (req, res) => {
  const users = await knex('users').select('*');
  res.render('users/users', {
    title: 'Users',
    users,
  });
};
const getLogin = async (req, res) => res.render('users/login', {
  title: 'Login', layout: false, errors: req.flash('errors'),
});


const postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/login');
  }
  const user = await knex('users').where({
    email: req.body.email,
  }).first();

  if (typeof user !== 'undefined') {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        req.session.user = user;
        return res.redirect('/user');
      }
      req.flash('errors', { param: 'password', msg: 'Wrong email or password' });
      return res.redirect('/login');
    });
  } else {
    req.flash('errors', { param: 'password', msg: 'Wrong email or password' });
    return res.redirect('/login');
  }
};
// register
const getRegister = (req, res) => res.render('users/register', {
  title: 'Register', layout: false, errors: req.flash('errors'),
});
// register
const postRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/register', { values: req.body });
  }

  bcrypt.hash(req.body.password, saltRounds, async (err, hashPassword) => {
    await knex('users').insert({
      email: req.body.email,
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashPassword,
      slug: slugify(req.body.username + Date.now()),
    }).asCallback((error) => {
      if (error !== null && error.code === 'ER_DUP_ENTRY') {
        req.flash('errors', { param: 'email', msg: 'This email is already taken' });
        return res.redirect('/register');
      }
      return res.redirect('/login');
    });
  });
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

const getUserId = async (req, res) => {
  const user = await knex('users')
    .where({
      slug: req.params.slug,
    })
    .select('*')
    .first();
  return res.render('users/userprofile', {
    user,
  });
};

const userEdit = async (req, res) => {
  await knex('users').where({
    slug: req.params.slug,
  }).update({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    slug: slugify(req.body.username + Date.now()),
  });
  return res.redirect('/users');
};
// delete user
const deleteUserId = async (req, res) => {
  await knex('users')
    .where({
      slug: req.params.slug,
    }, true)
    .del();
  return res.redirect('/users');
};
const getDelId = async (req, res) => {
  await knex('users')
    .where({
      slug: req.params.slug,
    })
    .del();
  return res.redirect('/users');
};
// add user
const getAdd = (req, res) => res.render('users/add', {
    title: 'Add',
  });
const postAdd = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await knex('users').insert({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    slug: slugify(req.body.username + Date.now()),
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
  postAdd,
  getAdd

};
