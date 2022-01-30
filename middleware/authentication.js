const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Invalid.');
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user to jobs route
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid.');
  }

  next();
};

module.exports = authMiddleware;
