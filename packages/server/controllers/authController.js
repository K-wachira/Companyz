const pool = require("../db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { sendResetEMail } = require("./emailController");

module.exports.handleLogin = (req, res) => {
  if (req.session.user && req.session.user.username) {
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports.attemptLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT id, username, passhash FROM users u WHERE u.username=$1",
    [req.body.username]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );
    if (isSamePass) {
      req.session.user = {
        username: req.body.username,
        id: potentialLogin.rows[0].id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  } else {
    res.json({ loggedIn: false, status: "Wrong username or password!" });
  }
};

module.exports.attemptRegister = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );
  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, passhash) values($1,$2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };

    res.json({ loggedIn: true, username: req.body.username });
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
};

exports.logout = async function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      throw new Error(err);
    } else {
      res.clearCookie(process.env.COOKIE_SECRET);
      return res.redirect("/");
    }
  });
};

module.exports.forgotPassword = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );
  if (existingUser.rowCount === 0) {
    // User not found
    res.json({ loggedIn: false, status: "User does not exist." });
  } else {
    // resent Password token
    const token = jwt.sign(
      {
        data: existingUser.rows[0].username,
      },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: "1h" }
    );

    // email to send

    details = {
      email: existingUser.rows[0].username,
      subject: "Companyz Password Reset",
      text:
        "Hello " +
        data.rows[0].first_name +
        "." +
        "\nClick on the link below to reset your password.\n"+
        token
        +" \n Best Companyz",
    };

    console.log(existingUser.rows[0], token);
    sendResetEMail({});
    res.json({ loggedIn: false, status: "Reset password email sent to user" });
  }
};
