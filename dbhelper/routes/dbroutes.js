const express = require("express");
const router = express.Router();
const {
  addEdamamRecipe,
  getRecipes,
  deleteRecipe,
  addUserRecipe,
  getExercise,
  addUserExercise,
  deleteUserExercise,
  getUserExercise,
} = require("../controllers/dbcontroller");

router.post("/db/addEdamamRecipe", addEdamamRecipe);

router.post("/db/getRecipe", getRecipes);
router.post("/db/deleteRecipe", deleteRecipe);
router.post("/db/addUserRecipe", addUserRecipe);

router.post("/db/getExercise", getExercise);
router.post("/db/getUserExercise", getUserExercise);
router.post("/db/addUserExercise", addUserExercise);
router.post("/db/deleteUserExercise", deleteUserExercise);

module.exports = router;
