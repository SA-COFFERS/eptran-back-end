const jwt = require('jsonwebtoken');
// const User = require('../models/User');

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ msg: 'You must be logged in' });

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    // const user = await User.findOne({ where: { id, email } });

    // if (!user) return res.status(401).json({ msg: 'Invalid User.' });

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch {
    return res.status(401).json({ msg: 'Expired or invalid session.' });
  }
};

module.exports = loginRequired;
