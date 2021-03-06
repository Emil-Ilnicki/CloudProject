const express = require("express");
const router = express.Router();
const {
  googlelogin,
  userlogin,
  userregister,
  getAPIRecipes,
  dbHelperAddEdamamRecipe,
  dbHelperGetRecipes,
  dbHelperDeleteRecipe,
  dbHelperAddUserRecipe,
  dbHelperGetDBExercise,
  dbHelperAddUserExercise,
  dbHelperDeleteUserExercise,
  dbHelperGetUserExercise,
} = require("../controllers/auth");
const { auth } = require("../middleware/authMiddleware");

// auth login and register routes
router.post("/api/googlelogin", googlelogin);
router.post("/api/login", userlogin);
router.post("/api/register", userregister);

// Edamam API route
router.post("/api/edamam/recipes", auth, getAPIRecipes);

// DbHelper Route
router.post("/api/dbhelper/addEdamam", auth, dbHelperAddEdamamRecipe);
router.post("/api/dbhelper/get", auth, dbHelperGetRecipes);
router.post("/api/dbhelper/delete", auth, dbHelperDeleteRecipe);
router.post("/api/dbhelper/addUser", auth, dbHelperAddUserRecipe);

router.post("/api/dbhelper/getDBExercise", auth, dbHelperGetDBExercise);
router.post("/api/dbhelper/getUserExercise", auth, dbHelperGetUserExercise);
router.post("/api/dbhelper/addUserExercise", auth, dbHelperAddUserExercise);
router.post(
  "/api/dbhelper/deleteUserExercise",
  auth,
  dbHelperDeleteUserExercise
);

module.exports = router;
