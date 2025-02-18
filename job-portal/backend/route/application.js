import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
  applyJob,
  getApplicants,
  getAppliedjobs,
  updateStatus,
} from "../controllers/Application.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedjobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").put(isAuthenticated, updateStatus);

export default router;
