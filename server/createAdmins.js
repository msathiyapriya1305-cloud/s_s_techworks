const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

console.log("Connecting to MongoDB...");

mongoose
  .connect("mongodb://127.0.0.1:27017/studentprojects")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

(async () => {
  try {
    console.log("Creating admins...");

    const admins = [
      { email: "admin1@example.com", password: "admin123" },
      { email: "admin2@example.com", password: "admin456" },
    ];

    for (const admin of admins) {
      const hashed = await bcrypt.hash(admin.password, 10);
      await Admin.create({
        email: admin.email,
        password: hashed,
      });
      console.log(`Created: ${admin.email}`);
    }

    console.log("DONE");
    process.exit();
  } catch (err) {
    console.error("ERROR:", err);
    process.exit(1);
  }
})();
