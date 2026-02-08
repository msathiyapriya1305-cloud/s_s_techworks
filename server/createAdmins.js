const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashed = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    email: "admin@test.com",
    password: hashed,
  });

  await admin.save();
  console.log("Admin created!");
  process.exit();
}

createAdmin();
