import express from "express";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  PostJob,
} from "../controllers/Job.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.route("/postjob").post(isAuthenticated, PostJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getAdminJob").get(isAuthenticated, getAdminJobs);

export default router;
