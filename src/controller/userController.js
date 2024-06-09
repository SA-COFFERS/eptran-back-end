const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/User');

// Get all users
exports.index = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['user_password'] } });
  try {
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro do Servidor.' });
  }
};

// Get user by id
exports.show = async (req, res) => {
  const user = await User.findOne({ where: { user_id: req.params.id }, attributes: { exclude: ['user_password'] } });
  if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });
  try {
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro do Servidor.' });
  }
};

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
    // Generate token
    const token = jwt.sign(
      {
        user_id,
        user_email: email,
        user_permission,
      },
      secret,
      {
        expiresIn: 3600,
      },
    );
    user.user_password = undefined;
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro do Servidor.' });
  }
};

exports.update = async (req, res) => {
  const user = await User.findByPk(req.userId); // Find user based on id got by token
  if (!user) return res.status(404).json({ msg: 'Usuário não encontrado.' });

  const {
    user_name,
    user_lastname,
    user_email,
    user_password,
    confirmpassword,
    user_birthdate,
    user_sex,
    user_education,
  } = req.body; // Get variables from requisition body

  if (user_email) {
    const isEmail = validator.isEmail(user_email); // Validate if email is valid
    if (!isEmail) return res.status(400).json({ msg: 'Email inválido.' });

    const emailExists = await User.findOne({ where: { user_email } }); // Validate if email exists
    if (emailExists) return res.status(400).json({ msg: 'Esse email já é utilizado por outro usuário.' });
  }

  let passwordHash; // hash password if exists
  if (user_password) {
    if (user_password.length < 4 || user_password.length > 30) {
      return res.status(400).json({ msg: 'As senhas devem ter entre 8 e 30 caracteres!' });
    }

    if (user_password !== confirmpassword) return res.status(400).json({ msg: 'As senhas estão diferentes!' });

    passwordHash = await bcryptjs.hash(user_password, 8);
  }

  try {
    const updateFields = {}; // creating a variable to ensure that any field is uptaded incorrectly

    // validating each field and adding on the object that will be updated
    if (user_name) updateFields.user_name = user_name;
    if (user_lastname) updateFields.user_lastname = user_lastname;
    if (user_email) updateFields.user_email = user_email;
    if (user_password) updateFields.user_password = passwordHash;
    if (user_birthdate) updateFields.user_birthdate = user_birthdate;
    if (user_sex) updateFields.user_sex = user_sex;
    if (user_education) updateFields.user_education = user_education;

    const updatedUser = await user.update(updateFields);

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao atualizar o usuário.' });
  }
};

exports.delete = async (req, res) => {
  const user = await User.findByPk(req.userId); // Find user based on id got by token
  if (!user) return res.status(404).json({ msg: 'Usuário não encontrado.' });

  // Validate password
  const { password } = req.body;
  if (!password || !req.body) return res.status(400).json({ msg: 'Insira sua senha.' });

  const passwordIsValid = await bcryptjs.compare(password, user.user_password);

  if (!passwordIsValid) return res.status(422).json({ msg: 'Senha incorreta!' });

  try {
    const deletedUser = await user.destroy();
    return res.json({ deletedUser });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro do servidor!' });
  }
};

// UPLOAD IMAGE

exports.upload = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId); // Find user based on id got by token
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    const { file } = req;
    if (!file) return res.status(400).json({ msg: 'Nenhum arquivo de imagem foi enviado.' }); // verify if a file was sent

    await user.update({ user_image_path: file.path }); // add the image path to the user

    return res.json({ msg: 'Imagem de perfil do usuário atualizada com sucesso', file });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao salvar a imagem.' });
  }
};

exports.removeimage = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId); // Find user based on id got by token
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    // fuction to remove image from uploads before setting the image path null
    const deleteFile = (filePath) => {
      // eslint-disable-next-line consistent-return
      fs.unlink(filePath, (error) => {
        if (error) return res.status(500).json({ msg: 'Erro ao excluir a imagem.' });
      });
    };

    deleteFile(user.user_image_path); // call the delete fuction and give the path to delete them

    await user.update({ user_image_path: null }); // set image path as null

    return res.json({ msg: 'Imagem de perfil do usuário removida com sucesso' });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao excluir a imagem.' });
  }
};
