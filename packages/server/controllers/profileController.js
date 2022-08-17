const pool = require("../db");

module.exports.getProfileData = async (req, res) => {
  const userprofile = await pool.query(
    "SELECT id, avatar_url, first_name, last_name, gender, age, dob, marital_status, nationality, id_type, id_number, id_url, is_verified FROM users u WHERE u.username=$1",
    [req.body.username]
  );
  if (userprofile.rowCount > 0) {
    const date = dateparse(userprofile.rows[0].dob);
    userprofile.rows[0].dob = date.split("T")[0];
    res.json(userprofile.rows[0]);
  } else {
    res.json({ status: "No Data!!" });
  }
};

module.exports.updateAvatarUrl = async (obj) => {
  console.log("obj--------------------------------------", obj);
  if (obj.type === "verification") {
    const updateIdUrl = await pool.query(
      "UPDATE users SET  id_url=$2  WHERE users.id=$1",
      [obj.id, obj.key]
    );

    if (updateIdUrl.rowCount > 0) {
      return 1;
    } else {
      return 0;
    }
  } else {
    const updateAvatar = await pool.query(
      "UPDATE users SET   avatar_url=$2 WHERE users.id=$1",
      [obj.id, obj.key]
    );
    if (updateAvatar.rowCount > 0) {
      return 1;
    } else {
      return 0;
    }
  }
};

function dateparse(date) {
  var date = new Date(date);
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });
  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

module.exports.updateProfileData = async (req, res) => {
  const updateProfile = await pool.query(
    "UPDATE users SET   first_name=$2,       last_name=$3,       gender=$4,        age=$5,       dob=$6,        marital_status=$7,       nationality=$8 WHERE users.id=$1",
    [
      req.body.id,
      req.body.f_name,
      req.body.l_name,
      req.body.gender,
      req.body.age,
      dateparse(req.body.dob),
      req.body.marital_status,
      req.body.nationality,
    ]
  );
  if (updateProfile.rowCount > 0) {
    res.json(updateProfile.rows[0]);
  } else {
    res.json({ status: "No Update!!" });
  }
};
