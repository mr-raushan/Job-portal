import { Job } from "../models/job.js";

export const PostJob = async (req, res) => {
  try {
    const {
      title,
      description,
      companyId,
      location,
      salary,
      requirements,
      jobType,
      experience,
      position,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !companyId ||
      !location ||
      !salary ||
      !requirements ||
      !jobType ||
      !experience ||
      !position
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const job = new Job({
      title,
      description,
      company: companyId,
      location,
      salary: Number(salary),
      requirements: requirements.split(","),
      jobType,
      experienceLevel: experience,
      position,
      created_by: userId,
    });

    await job.save();

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log("Error in posting job:", error);
    return res.status(500).json({
      message: "Server Error in posting job",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("Error in getting all jobs:", error);
    return res.status(500).json({
      message: "Server Error in getting all jobs",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job fetched successfully using id",
      success: true,
      job,
    });
  } catch (error) {
    console.log("Error in getting job by id:", error);
    return res.status(500).json({
      message: "Server Error in getting job by id",
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Admin jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("Error in getting admin jobs:", error);
    return res.status(500).json({
      message: "Server Error in getting admin jobs",
      success: false,
    });
  }
};
