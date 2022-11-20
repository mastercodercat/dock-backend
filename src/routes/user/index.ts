import express from "express";

import { rateUser, fetchUsers } from "../../controllers/user";
import { rateRules } from "../../utils/validationRules";
import { validate } from "../../middlewares/validation";

const routes = express.Router();

routes.get("", fetchUsers);
routes.post("/rate", rateRules(), validate, rateUser);

export default routes;
