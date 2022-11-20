import dotenv from "dotenv";

dotenv.config();

export default {
  // application configurations
  appName: process.env.APP_NAME || "Dock P2P Rating App",
  appPort: process.env.APP_PORT || 3000,
  privateKey: process.env.APP_PRIVATE_KEY || "dock-rating",
  expires: process.env.APP_TOKEN_EXPIRE || "1d",
};
