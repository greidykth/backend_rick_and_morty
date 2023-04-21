const { User } = require("../DB_connection");

const postUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(404).json({ error: "Email or password missing" });
    }
    const newUser = await User.findOrCreate({
      where: { email: email },
      defaults: {
        password: password,
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
