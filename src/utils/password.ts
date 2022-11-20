import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

import config from "../config";

const saltRounds = 10;

export const hashPassword = async (plainPassword: string) => {
  const hash = await bcrypt.hash(plainPassword, saltRounds);

  return hash;
};

export const hashPasswordSync = (password: string) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

  return isMatch;
};

export const generateToken = (user: User) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, config.privateKey, {
    expiresIn: config.expires,
  });
};
