const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  } = req.body;

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
    });

    newUser.user_password = undefined;
    return res.json({ newUser });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao criar o usuário.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: 'Preencha todos os campos.' });

  // Validate if user exists
  const user = await User.findOne({ where: { user_email: email } });
  if (!user) return res.status(400).json({ msg: 'Usuário não existe' });

  // Validate if password is correct
  const passwordIsValid = await bcryptjs.compare(password, user.user_password);
  if (!passwordIsValid) return res.status(422).json({ msg: 'Senha Incorreta.' });

  try {
    const { user_id, user_permission } = user;
    const secret = process.env.TOKEN_SECRET;
    const expiration = process.env.TOKEN_EXPIRATION;
    // Generate token
    const token = jwt.sign(
      {
        user_id,
        user_email: email,
        user_permission,
      },
      secret,
      {
        expiresIn: expiration,
      },
    );
    user.user_password = undefined;
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro do Servidor.' });
  }
};

exports.index = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['user_password'] } });
  try {
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro do Servidor.' });
  }
};
