import { Application } from "../models/application.js";
import { Job } from "../models/job.js";
import mongoose from "mongoose";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: "Invalid job ID format",
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    // console.log("existingApplication -> ", existingApplication);
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId)
      .populate("application")
      .catch((err) => {
        console.error("error populating job -> ", err);
        return null;
      });
    // console.log("job after populate -> ", job);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      message: "Job applied successfully",
      success: true,
      application: newApplication,
    });
  } catch (error) {
    console.log("Error applying for job: ", error);
    return res.status(500).json({
      message: "Server Error in applying for job",
      success: false,
    });
  }
};

export const getAppliedjobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    // console.log("Applications:");
    // console.log(application);

    if (!application) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.log("Error getting applied jobs: ", error);
    return res.status(500).json({
      message: "Server Error in getting applied jobs",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applicants fetched successfully using job id",
      success: true,
      applicants: job,
    });
  } catch (error) {
    console.log("Error getting applicants: ", error);
    return res.status(500).json({
      message: "Server Error in getting applicants",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }
    if (!applicationId) {
      return res.status(400).json({
        message: "Application ID is required",
        success: false,
      });
    }

    //find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.log("Error updating status: ", error);
    return res.status(500).json({
      message: "Server Error in updating status",
      success: false,
    });
  }
};
