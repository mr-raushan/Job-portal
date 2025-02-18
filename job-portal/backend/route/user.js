import express from "express";
import { login, logOut, register, updateProfile } from "../controllers/User.js";
import isAuthenticated from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logOut);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);

export default router;
