const pool = require("../db");

const { sendNotificationEMail } = require("./emailController");

module.exports.getUnverified = async (req, res) => {
  console.log(req.body);
  const pendingProfiles = await pool.query(
    "SELECT id, first_name, last_name, gender, age, dob, nationality, id_type, id_number, id_url FROM users u WHERE u.is_verified='false' AND u.id_number IS NOT NULL "
  );
  if (pendingProfiles.rowCount > 0) {
    res.json(pendingProfiles.rows);
  } else {
    res.json({ status: "No Data!!" });
  }
};

module.exports.verify = async (req, res) => {
  let id = 1;
  console.log(req.body);
  const verifyProfile = await pool.query(
    "UPDATE users SET is_verified=$2 WHERE users.id=$1",
    [8, true]
  );

  if (verifyProfile.rowCount > 0) {
    const data = await pool.query(
      "SELECT username, first_name  FROM users u WHERE u.id=$1",
      [8]
    );
    console.log(data.rows[0].username)
    sendNotificationEMail({ email: data.rows[0].username, subject: "Account Verified", text: "Hello "+ data.rows[0].first_name+ "." +"\nYour account was verified. \n Best Companyz" });
    res.json({ status: "Verified Successfully" });
  } else {
    res.json({ status: "Not Verified!!", req: req.body, res: verifyProfile });
  }
};
