const Superadmin = require('../schema/superadmin'); // Import Superadmin model
const bcrypt = require('bcryptjs'); // For password encryption
const jwt = require('jsonwebtoken'); // For generating JWT token
const Admin = require('../schema/adminschema');

exports.getAllAdmins = async (req, res) => {
    console.log("sbvfbfh")
    try {
      const { superadminId } = req.params;
      const superadmin = await Superadmin.findById(superadminId);
      if (!superadmin) {
        return res.status(404).json({ message: 'Superadmin not found' });
      }
  
      const admins = await Admin.find();
      res.status(200).json({ admins });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
exports.addSuperadmin = async (req, res) => {
  try {
    // Destructuring data from the request body
    const { name, email, password } = req.body;

    // Check if the superadmin with the given email already exists
    const existingSuperadmin = await Superadmin.findOne({ email });
    if (existingSuperadmin) {
      return res.status(400).json({ message: 'Superadmin already exists with this email' });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new superadmin instance
    const newSuperadmin = new Superadmin({
      name,
      email,
      password: hashedPassword,
      admins: [], // Initially, no admins are added
    });

    // Save the superadmin to the database
    await newSuperadmin.save();

    // Generate a JWT token (optional, depending on your auth system)
    const token = jwt.sign({ superadminId: newSuperadmin._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Respond with success and the generated token
    res.status(201).json({ message: 'Superadmin added successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Add Admin Controller (modified to include admin creation in the superadmin's admin list)
exports.addAdmin = async (req, res) => {
    console.log("fkvjfvjf")
  try {
    const { superadminId, name, email, password, collegeName, phone } = req.body;

    const superadmin = await Superadmin.findById(superadminId);
    if (!superadmin) {
      return res.status(404).json({ message: 'Superadmin not found' });
    }

    const existingAdmin = superadmin.admins.find(admin => admin.email === email);
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      collegeName,
      phone,
    });

    await newAdmin.save();

    superadmin.admins.push({
      name,
      email,
      collegeName,
      phone,
    });

    await superadmin.save();

    res.status(201).json({ message: 'Admin added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.login = async (req, res) => {
    try {
      console.log("jf")
      const { email, password } = req.body;
      console.log(req.body)
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if the email belongs to a Superadmin
      const existingSuperadmin = await Superadmin.findOne({ email });
      if (existingSuperadmin) {
        const isPasswordValid = await bcrypt.compare(password, existingSuperadmin.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
  
        const token = jwt.sign(
          { superadminId: existingSuperadmin._id, role: "superadmin" },
          process.env.JWT_SECRET || "your_jwt_secret",
          { expiresIn: "1h" }
        );
  
        return res.status(200).json({
          message: "Login successful",
          token,
          user: {
            name: existingSuperadmin.name,
            email: existingSuperadmin.email,
            role: "superadmin",
          },
        });
      }
  
      // If no Superadmin found, return error message
      return res.status(400).json({ message: "Invalid credentials" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  