const bcrypt = require("bcryptjs");
const Player = require("../schema/playerschema");
const Admin=require("../schema/adminschema")
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, adminId } = req.body;

    if (!name || !email || !password || !confirmPassword || !adminId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
      return res.status(400).json({ message: "Player with this email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new player
    const newPlayer = new Player({
      name,
      email,
      password: hashedPassword,
      adminId, // Store the adminId to associate the player with an admin
    });

    // Save the player to the database
    await newPlayer.save();

    // Find the admin and update the players array
    await Admin.findByIdAndUpdate(adminId, {
      $push: { players: newPlayer._id }, // Add player to admin's players list
    });

    const token = jwt.sign(
      { playerId: newPlayer._id, role: "student"},
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Player created successfully",
      token,
      player: {
        name: newPlayer.name,
        email: newPlayer.email,
        level: newPlayer.level,
        experience: newPlayer.experience,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPlayer = await Player.findOne({ email });
    if (!existingPlayer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingPlayer.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { playerId: existingPlayer._id,role:"student"},
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      player: {
        name: existingPlayer.name,
        email: existingPlayer.email,
        level: existingPlayer.level,
        experience: existingPlayer.experience,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { signup,login };
