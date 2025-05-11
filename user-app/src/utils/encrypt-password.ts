import bcrypt from 'bcryptjs';

const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 12);
  return encryptedPassword;
};

export default encryptPassword;
