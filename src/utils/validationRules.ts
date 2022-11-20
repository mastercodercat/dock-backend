import { body } from "express-validator";

export const signinRules = () => {
  return [body("name").isString(), body("password").isString()];
};

export const signupRules = () => {
  return [body("name").isString(), body("password").isString()];
};

export const rateRules = () => {
  return [body("rating").isNumeric(), body("userId").isNumeric()];
};
