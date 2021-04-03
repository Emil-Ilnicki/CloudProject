const Recipe = require("../models/Recipe");
const Exercise = require("../models/Exercise");
const UserExercise = require("../models/UserExercise");

const addEdamamRecipe = async (req, res) => {
  console.log("Adding Edamam Recipe");
  const recipe = Recipe(req.body);

  try {
    await recipe.save();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    res.status(500).send({ msg: "error" });
  }
};

const getRecipes = async (req, res) => {
  console.log("Getting Recipe");
  const { user } = req.body;
  await Recipe.find({ user }, (err, data) => {
    if (err)
      res.status(500).send({ msg: "There was an error getting the data" });

    res.status(200).send({
      data,
    });
  });
};

const addUserRecipe = async (req, res) => {
  console.log("Adding User Recipe");
  const recipe = Recipe(req.body);

  try {
    await recipe.save();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    res.status(500).send({ msg: "error" });
  }
};

const deleteRecipe = async (req, res) => {
  console.log("Deleting Recipe");
  const { user, title } = req.body;

  try {
    await Recipe.deleteOne({ user, title }, (err, data) => {
      if (err) res.status(400).send({ msg: "database error" });
      res.status(200).send({ msg: "Recipe Deleted" });
    });
  } catch (e) {
    res.status(500).send({ msg: "Error" });
  }
};

const getExercise = async (req, res) => {
  console.log("Getting Exercise");
  const { target } = req.body;
  console.log(target);

  try {
    await Exercise.find({ targets: target }, (err, data) => {
      if (err) res.status(400).send({ msg: "database error" });
      console.log(data);
      res.status(200).send({ data });
    });
  } catch (e) {
    res.status(500).send({ msg: "Error" });
  }
};

const getUserExercise = async (req, res) => {
  console.log("Getting User Exercise");
  const { user } = req.body;
  await UserExercise.find({ user }, (err, data) => {
    if (err)
      res.status(500).send({ msg: "There was an error getting the data" });

    console.log(data);

    res.status(200).send({
      data,
    });
  });
};

const addUserExercise = async (req, res) => {
  console.log("Adding User Exercise");
  const userExercise = UserExercise(req.body);

  try {
    await userExercise.save();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    res.status(500).send({ msg: "error" });
  }
};

const deleteUserExercise = async (req, res) => {
  console.log("Deleting User Exercise");
  const { user, title } = req.body;

  try {
    await UserExercise.deleteOne({ user, title }, (err, data) => {
      if (err) res.status(400).send({ msg: "database error" });
      res.status(200).send({ msg: "Recipe Deleted" });
    });
  } catch (e) {
    res.status(500).send({ msg: "Error" });
  }
};

module.exports = {
  addEdamamRecipe,
  getRecipes,
  deleteRecipe,
  addUserRecipe,
  getExercise,
  addUserExercise,
  deleteUserExercise,
  getUserExercise,
};
