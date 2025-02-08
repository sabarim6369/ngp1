    const mongoose = require("mongoose");

    const SuperadminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admins: [
        {
        name: String,
        email: String,
        collegeName: String,
        phone: String,
        createdAt: { type: Date, default: Date.now },
        },
    ],
    });

    module.exports = mongoose.model("Superadmin", SuperadminSchema);
