const {
  body,
} = require('express-validator');

const registerValidation = [
  // Check fullname field
  body('fullname').not().isEmpty().withMessage('Invalid full name'),
    // Check username field
    body('username').not().isEmpty().withMessage('Invalid  name'),
  // Check email field
  body('email').isEmail().withMessage('Invalid email input'),
  // Check password fields
  body('password').isLength({ min: 3 }).withMessage('The password should be at least 3 characters'),
  body('passwordConfirmation').not().isEmpty().withMessage('This input field should not be empty'),
  body('password').custom((value, { req }) => {
    if (value !== req.body.passwordConfirmation) {
      throw new Error('Password confirmation is incorrect');
    }
    return true;
  }),
];
const loginValidation = [
  // Check email field
  body('email').isEmail().withMessage('Invalid email input'),
  // Check password fields
  body('password').isLength({ min: 3 }).withMessage('The password should be at least 3 characters'),
];
module.exports = {
  registerValidation,
  loginValidation,
};
