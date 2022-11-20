import express from "express";
import passport from "passport";
import "../services/passport";

import authRoutes from "./auth";
import userRoutes from "./user";

const routes = express.Router();
const requireAuth = passport.authenticate("jwt", { session: false });

routes.use("/auth", authRoutes);
routes.use("/users", requireAuth, userRoutes);

export default routes;
