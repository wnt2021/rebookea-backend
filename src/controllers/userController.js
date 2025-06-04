import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ exists: "User already exists" });
    }

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { name: name, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      success: "User registered succesfully",
      token: token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ exists: "User does not exist" });
    }

    const account = user;

    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { name: account.name, email: account.email, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: "User logged succesfully",
      token: token,
      user: account,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ exists: "User does not exist" });
    }

    res.status(200).json({ success: "User exists", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ success: "Password was updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};

export { login, register, recoverPassword, resetPassword };
