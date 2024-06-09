const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isStaff = async (req, res, next) => {
  const { authorization } = req.headers;

  // verify if an authorization was sent
  if (!authorization) return res.status(401).json({ msg: 'Você deve estar logado.' });

  const [, token] = authorization.split(' ');

  try {
    // Verify token, and get data
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    // Destructuring data
    const { user_id, user_email, user_permission } = data;

    // Verify if user exists
    const user = await User.findOne({ where: { user_id, user_email } });
    if (!user) return res.status(401).json({ msg: 'Usuário Inválido.' });

    if (user_permission === 'user') return res.status(401).json({ msg: 'Você não tem permissão para isso.' });

    // Set global variables
    req.userId = user_id;
    req.userEmail = user_email;
    req.userPermission = user_permission;

    return next();
  } catch {
    return res.status(401).json({ msg: 'Sessão expirada ou inválida.' });
  }
};

module.exports = isStaff;
