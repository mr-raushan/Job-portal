import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    const file = req.file;

    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: `${email} already registered`,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await user.save();
    return res.status(200).json({
      message: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Cannot register user: ", error.message);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `${email} not found`,
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome ${user.fullName}!`,
        success: true,
        user,
        token,
      });
  } catch (error) {
    console.log("error in login", error.message);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("cannot log out");
    return res.status(500).json({
      message: "Server Error in loged out",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, bio, skills } = req.body;

    const file = req.file;
    // console.log("req.file: ", req.file);
    // console.log("file: ", file);

    //clodinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (!user.profile) {
      user.profile = {};
    }

    //resume upload to cloudinary
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: {
        bio: user.profile.bio,
        skills: user.profile.skills,
        resume: user.profile.resume,
        resumeOriginalName: user.profile.resumeOriginalName,
      },
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in updating profile");

    return res.status(500).json({
      message: "Server Error in updateProfile",
      success: false,
    });
  }
};
