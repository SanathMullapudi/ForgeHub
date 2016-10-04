import jwt from 'jwt-simple';
const JWT_SECRET = process.env.JWT_SECRET;

export const authMW = (req, res, next) => {
  let payload;
  try {
    payload = jwt.decode(req.headers.authorization.split(' ')[1], JWT_SECRET);
  } catch (err) {} // handle err case however we want here
  req.authUser = payload;
  next();
};
