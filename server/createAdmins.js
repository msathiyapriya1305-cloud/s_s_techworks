const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

async function createAdmins() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Mongo connected");

    const password = "yellow_butter@35";
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Admin profiles
    const admins = [
      {
        email: "sakthimeena.gp03@gmail.com",
        password: hashed,
        name: "Sakthi",
        avatar: "/avatars/sakthi.jpg",
      },
      {
        email: "msathiyapriya1305@gmail.com",
        password: hashed,
        name: "Sathiya",
        avatar: "/avatars/sathiya.jpg",
      },
      {
        email: "sstechworks26@gmail.com",
        password: hashed,
        name: "Admin",
        avatar: "/avatars/default.png",
      },
    ];

    for (const admin of admins) {
      const exists = await Admin.findOne({ email: admin.email });

      if (!exists) {
        await Admin.create(admin);
        console.log("✅ Created:", admin.email);
      } else {
        // ✅ update password + profile
        await Admin.updateOne(
          { email: admin.email },
          {
            password: admin.password,
            name: admin.name,
            avatar: admin.avatar,
          }
        );

        console.log("🔄 Updated:", admin.email);
      }
    }

    console.log("🎉 Admin setup complete!");
    await mongoose.disconnect();
    process.exit();

  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createAdmins();
