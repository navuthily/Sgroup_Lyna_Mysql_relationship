
const userAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.redirect('/login');
};


const userIsNotAuth = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  return res.redirect('/users');
};

module.exports = { userAuth, userIsNotAuth };
