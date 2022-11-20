import db from "../db";
import logger from "../utils/logger";
import { comparePasswords, generateToken } from "../utils/password";

export const signIn = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await db.user.findFirst({
      where: {
        name,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Incorrect Credentials" });
    }

    const isMatch = await comparePasswords(password, user.password as string);

    if (isMatch) {
      const token = generateToken(user);

      return res.send({
        token,
        user,
      });
    } else {
      return res.status(401).json({ error: "Incorrect Credentials" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Incorrect Credentials" });
  }
};

export const signUp = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(422)
      .send({ error: "Username and password must be provided" });
  }

  try {
    const existingUser = await db.user.findFirst({
      where: {
        name,
      },
    });

    if (existingUser) {
      return res.status(422).send({ error: "Name is already in use..." });
    }

    const user = await db.user.create({
      data: {
        name: name,
        password,
      },
    });

    return res.json({ user, token: generateToken(user) });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ error: "Sign up error" });
  }
};
