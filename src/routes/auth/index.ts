import express from "express";

import { signIn, signUp } from "../../controllers/authentication";
import { signinRules, signupRules } from "../../utils/validationRules";
import { validate } from "../../middlewares/validation";

const routes = express.Router();

routes.post("/signin", signinRules(), validate, signIn);
routes.post("/signup", signupRules(), validate, signUp);

export default routes;
