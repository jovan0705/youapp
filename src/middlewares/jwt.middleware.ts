import * as jwt from 'jsonwebtoken';

export const sign = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY);
};

export const verify = (payload) => {
  return jwt.verify(payload, process.env.SECRET_KEY);
};
