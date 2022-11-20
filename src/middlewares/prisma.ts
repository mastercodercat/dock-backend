import { Prisma } from "@prisma/client";
import { hashPasswordSync } from "../utils/password";

export const hashPasswordMiddleware = async (params, next) => {
  if (params.model === Prisma.ModelName.User) {
    if (params.action === "create") {
      params.args.data.password = hashPasswordSync(params.args.data.password);
    } else if (params.action === "createMany") {
      params.args.data = params.args.data.map((user) => ({
        ...user,
        password: hashPasswordSync(user.password),
      }));
    }
  }
  return next(params);
};
