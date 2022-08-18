const { loginFormSchema, signupFormSchema } = require("@companyz/common");

const validateLoginForm = (req, res, next) => {
  const formData = req.body;
  loginFormSchema
    .validate(formData)
    .catch(() => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        next();
      } else {
        res.status(422).send();
      }
    });
};

const validateSignupForm = (req, res, next) => {
  const formData = req.body;
  signupFormSchema
    .validate(formData)
    .catch(() => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports = { validateLoginForm, validateSignupForm };
