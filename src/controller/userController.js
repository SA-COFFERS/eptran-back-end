const User = require('../models/User');

// Register user
exports.create = async (req, res) => {
  const {
    user_name,
    user_lastname,
    user_email,
    user_password,
    user_birthdate,
    user_sex,
    user_education,
    user_permission,
  } = req.body;
  console.log(req.body);

  // eslint-disable-next-line max-len
  if (!user_name || !user_email || !user_password || !user_lastname || !user_birthdate || !user_education || !user_sex || !user_permission) {
    return res.status(400).json({ msg: 'Complete all the fields!' });
  }

  try {
    const newUser = await User.create({
      user_name,
      user_lastname,
      user_email,
      user_password,
      user_birthdate,
      user_sex,
      user_education,
      user_permission,
    });

    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ msg: 'Error creating a new user!' });
  }
};
