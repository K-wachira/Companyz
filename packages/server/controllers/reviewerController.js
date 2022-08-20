const pool = require("../db");

module.exports.getUnverified = async (req, res) => {
  const pendingProfiles = await pool.query(
    "SELECT id, first_name, last_name, gender, age, dob, nationality, id_type, id_number, id_url FROM users u WHERE u.is_verified='false'"  );
  if (pendingProfiles.rowCount > 0) {
    res.json(pendingProfiles.rows);
  } else {
    res.json({ status: "No Data!!" });
  }
};
