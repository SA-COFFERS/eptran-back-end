const validator = require('validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

// Register user
exports.create = async (req, res) => {
  const {
    user_name,
    user_lastname,
    user_email,
    user_password,
    confirmpassword,
    user_birthdate,
    user_sex,
    user_education,
    user_permission,
  } = req.body;
  console.log(req.body);

  // eslint-disable-next-line max-len
  if (!user_name || !user_email || !user_password || !confirmpassword || !user_lastname || !user_birthdate || !user_education || !user_sex) {
    return res.status(400).json({ msg: 'Preencha todos os campos.' });
  }

  if (user_password !== confirmpassword) {
    return res.status(400).json({ msg: 'As senhas estão diferentes.' });
  }

  // Validate if email is valid
  if (!validator.isEmail(user_email)) {
    return res.status(400).json({ msg: 'Insira um email válido.' });
  }

  // Validate if the email was already used
  if (await User.findOne({ where: { user_email } })) {
    return res.status(400).json({ msg: 'Esse email já foi cadastrado' });
  }

  if (user_password.length < 8 || user_password.length > 30) {
    return res.status(400).json({ msg: 'A senha deve possuir entre 8 e 30 caracteres' });
  }

  const passwordHash = await bcryptjs.hash(user_password, 8);

  try {
    const newUser = await User.create({
      user_name,
      user_lastname,
      user_email,
      user_password: passwordHash,
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
