const validUsers = require("../utils/users");

const STATUS_OK = 200;
const STATUS_ERROR = 404;

const login = (req, res) => {
  const { email, password } = req.query;

  try {
    if (!password || !email) {
      return res
        .status(500)
        .json({ message: "There isn't a password or email" });
    }
    const findUser = validUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (findUser) {
      res.status(STATUS_OK).json({ access: true });
    } else {
      res.status(STATUS_OK).json({ access: false });
    }
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

module.exports = login;
