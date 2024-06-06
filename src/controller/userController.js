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
      user_fk_image_path: null,
    });

    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ msg: 'Error creating a new user!' });
  }
};
