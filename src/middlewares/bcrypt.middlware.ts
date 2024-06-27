import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = async (hash, password) => {
  const isTrue = await bcrypt.compareSync(password, hash);
  return isTrue;
};
