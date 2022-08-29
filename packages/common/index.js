const Yup = require("yup");
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const loginFormSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .email("Username must be an email")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long!"),
});

const forgotPasswordSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .email("Username must be an email")
    .max(28, "Username too long!"),
});

const signupFormSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .email("Username must be an email")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required")
    .matches("(?=.{8,})", "Password must be 8 characters or longer")
    .matches("(?=.*[a-z])", "Password must have at least one lower case")
    .matches("(?=.*[A-Z])", "Password must have at least one uppercase case")
    .matches("(?=.*[0-9])", "Password must have at least one digit")
    .matches(specialChars, "Password must have at least one special character")
    .max(28, "Password too long!"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

module.exports = { loginFormSchema, signupFormSchema, forgotPasswordSchema };
