import bcrypt from 'bcrypt';

export const comparePassword = async (enteredPassword, encryptedPassword) => {
    const isMatch = await bcrypt.compare(enteredPassword, encryptedPassword);
    return isMatch;
}