const jwt = require('jsonwebtoken');
const secretKey = 'DCSKEY';

function validate(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const user = validateTokenAndGetUser(token);
  req.user = user;
  next();
}

function validateTokenAndGetUser(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.user;
  } catch (e) {
    return null;
  }
}

module.exports = {
  validate,
};
