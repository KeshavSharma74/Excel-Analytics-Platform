import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
// import transporter from "../config/nodemailer.js";
import transporter from "../config/nodemailer.js";
import { PASSWORD_RESET_TEMPLATE,WELCOME_EMAIL_TEMPLATE } from "../config/emailTemplate.js";
// import { PASSWORD_RESET_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "../config/emailTemplates.js";
import { User } from "../models/User.model.js";

// 🔹 Register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "name, email and password should be present.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Welcome to my Website",
      html: WELCOME_EMAIL_TEMPLATE.replace("{{email}}", email).replace(
        "{{name}}",
        name
      ),
    });

    return res.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password both should be present",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Password is not correct",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Logout
const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Send Reset OTP
const sendResetOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email is not registered",
      });
    }

    const resetOtp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = resetOtp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Reset Password using OTP",
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", resetOtp).replace(
        "{{email}}",
        email
      ),
    });

    return res.json({
      success: true,
      message: "Otp sent successfully to reset password",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Reset Password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, otp and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email is not registered",
      });
    }

    if (otp === "" || otp !== user.resetOtp) {
      return res.json({
        success: false,
        message: "Invalid Otp",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Otp expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    user.password = hashedPassword;

    await user.save();

    return res.json({
      success: true,
      message: "Password changed Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const checkAuth = async(req,res)=>{
  try{
            const {userId} = req.body;

        if(!userId){
            return res.json({
                success:false,
                message:"Invalid user.Login again"
            })
        }

        const user=await User.findById(userId);

        if(!user){
            return res.json({
                success:false,
                message:"Invalid User.Login again",
            })
        }

        return res.json({
          success:true,
          message:"Data fetched Successfully",
          user
        })
  }
  catch(error){
    console.log(error);
    return res.json({
      success:false,
      message:error.message
    })
  }
}

export { register, login, logout, sendResetOTP, resetPassword ,checkAuth};
