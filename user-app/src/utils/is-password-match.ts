import bcrypt from 'bcryptjs';

const isPasswordMatch = async (password: string, userPassword: string) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};

export default isPasswordMatch;
