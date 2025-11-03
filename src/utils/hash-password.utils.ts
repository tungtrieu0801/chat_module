import * as bcrypt from 'bcrypt';

/**
 * Hash password using bcrypt
 * @param password plain text password to hash
 * @param saltRounds number of salt rounds to use for hashing, typically 10 or more, more rounds increase security but also increase hashing time
 * @returns hashsed password
 */
export async function hashPassword(password: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
}