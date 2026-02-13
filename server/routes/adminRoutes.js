const express = require("express");
const { loginAdmin } = require("../controllers/adminController");

const router = express.Router();

/* =====================================================
   ADMIN LOGIN
===================================================== */

router.post("/login", loginAdmin);

module.exports = router;
