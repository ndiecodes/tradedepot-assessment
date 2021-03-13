exports.register = (req, res) => {
  res.json({ msg: "it works" });
};

exports.login = (req, res) => {
  res.json({ msg: "login route" });
};
