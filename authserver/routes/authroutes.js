const express = require("express");
const router = express.Router();
const {
  googlelogin,
  userlogin,
  userregister,
} = require("../controllers/authcontroller");

router.post("/auth/googleLogin", googlelogin);
router.post("/auth/userLogin", userlogin);
router.post("/auth/userRegister", userregister);

module.exports = router;
