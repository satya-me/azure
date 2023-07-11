// User.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        full_name: { type: String, required: [true, "Name is required"] },
        email: {
            type: String,
            unique: [true, "Email is unique"],
        },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
