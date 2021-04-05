const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();
const DB_HELPER_URL = "http://dbhelper-server-cluster-ip-service:4001";
const AUTH_URL = "http://auth-server-cluster-ip-service:4002";

const defaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const userlogin = async (req, res) => {
  console.log("User Login");
  console.log(req.body);

  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(`${AUTH_URL}/auth/userLogin`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.auth === true) res.status(200).send(data);
        else res.status(500).send(data);
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "error",
      error: e,
    });
  }
};

const userregister = async (req, res) => {
  console.log("User Register");
  console.log(req.body);

  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      `${AUTH_URL}/auth/userRegister`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.auth === true) res.status(200).send(data);
        else res.status(500).send(data);
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const googlelogin = async (req, res) => {
  console.log("Google Login");
  console.log(req.body);

  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(`${AUTH_URL}/auth/googleLogin`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.auth === true) res.status(200).send(data);
        else res.status(500).send(data);
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const getAPIRecipes = async (req, res) => {
  const { query, healthLabel } = req.body;
  console.log(req.body);

  if (healthLabel === "none") {
    console.log("In none");
    try {
      const edamamFetch = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
      );
      const data = await edamamFetch.json();
      res.status(200).send(data.hits);
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Error" });
    }
  } else {
    console.log("In else");
    try {
      const edamamFetch = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&health=${healthLabel}`
      );
      const data = await edamamFetch.json();
      res.status(200).send(data.hits);
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Error" });
    }
  }
};

const dbHelperAddEdamamRecipe = async (req, res) => {
  console.log(req.body);
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      `${DB_HELPER_URL}/db/addEdamamRecipe`,
      requestOptions
    )
      .then((res) => console.log(res))
      .then((data) => console.log(data));

    res.status(200).send({ msg: "response" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const dbHelperGetRecipes = async (req, res) => {
  console.log(req.body);
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      `${DB_HELPER_URL}/db/getRecipe`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => data);

    res.status(200).send({
      response,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const dbHelperDeleteRecipe = async (req, res) => {
  console.log(req);
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const reponse = await fetch(
      `${DB_HELPER_URL}/db/deleteRecipe`,
      requestOptions
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }

  res.status(200).send({ msg: "success" });
};

const dbHelperAddUserRecipe = async (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      `${DB_HELPER_URL}/db/addUserRecipe`,
      requestOptions
    )
      .then((res) => console.log(res))
      .then((data) => console.log(data));
    res.status(200).send({ msg: "response" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const dbHelperGetDBExercise = async (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      `${DB_HELPER_URL}/db/getExercise`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => data);

    res.status(200).send({ response });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const dbHelperGetUserExercise = async (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };
  try {
    const response = await fetch(
      `${DB_HELPER_URL}/db/getUserExercise`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => data);

    res.status(200).send({ response });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const dbHelperAddUserExercise = async (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      `${DB_HELPER_URL}/db/addUserExercise`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => data);

    res.status(200).send({ msg: "Okay" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

const dbHelperDeleteUserExercise = async (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      `${DB_HELPER_URL}/db/deleteUserExercise`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => data);

    res.status(200).send({ response });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Error" });
  }
};

module.exports = {
  googlelogin,
  userlogin,
  userregister,

  getAPIRecipes,

  dbHelperAddEdamamRecipe,
  dbHelperGetRecipes,
  dbHelperDeleteRecipe,
  dbHelperAddUserRecipe,

  dbHelperGetDBExercise,
  dbHelperGetUserExercise,
  dbHelperAddUserExercise,
  dbHelperDeleteUserExercise,
};
