const { User } = require("../DB_connection");

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const login = async (req, res) => {
  const { email, password } = req.query;

  try {
    if (!password || !email) {
      res.status(400).json({ message: "Password or email missing" });
    }

    const findUser = await User.findOne({ where: { email: email }});

    if (!findUser) {
      res.status(404).json({ message: "User not found" });
    }

    if (findUser.password === password) {
      res.status(200).json({ access: true });
    } else {
      res.status(403).json({ error: "Invalid password" });
    }

  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

module.exports = login;
