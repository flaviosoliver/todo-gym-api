import * as bcrypt from 'bcryptjs';

export const comparePasswords = async (
  passwordLogin: string,
  passwordUser: string
): Promise<boolean> => {
  return await bcrypt.compare(passwordLogin, passwordUser);
};
