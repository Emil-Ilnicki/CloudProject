const { OAuth2Client } = require("google-auth-library");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_OATUH_CLIENTID);

const userlogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ msg: "Please enter all fields" });
  }

  try {
    User.findOne({ email }, (err, user) => {
      if (err) return res.status(500).send({ msg: "Error on the server" });
      if (!user)
        return res.status(404).send({ msg: "This user does not exist" });

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }
      const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        auth: true,
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  } catch (error) {
    return res.status(404).send({ msg: "Error" });
  }
};

const userregister = (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);

  if (!email || !password) {
    res.status(400).send({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).send({ msg: "User already exists" }); // if user exists

    const salt = bcrypt.genSaltSync(8);
    const hasedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hasedPassword,
    });

    newUser.save().then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
        expiresIn: 86400, //24 hours
      });

      res.status(200).send({
        auth: true,
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  });
};

const googlelogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_OATUH_CLIENTID,
    })
    .then((response) => {
      const { email_verified, email } = response.payload;
      if (email_verified) {
        try {
          User.findOne({ email }, (err, user) => {
            if (err) {
              return res.status(500).send({ msg: "Error on the server" });
            } else {
              if (user) {
                console.log("Login Google Auth");
                const token = jwt.sign(
                  { id: user.id },
                  process.env.AUTH_SECRET,
                  {
                    expiresIn: 86400, //24 hours
                  }
                );
                return res.status(200).send({
                  auth: true,
                  token,
                  user: {
                    id: user.id,
                    email: user.email,
                  },
                });
              } else {
                console.log("Register Google auth");
                const password = email + process.env.AUTH_SECRET;
                const newUser = User({
                  email,
                  password,
                });
                newUser.save().then((err, user) => {
                  if (err)
                    return res
                      .status(500)
                      .send({ msg: "Something went wrong" });

                  const token = jwt.sign(
                    { id: user.id },
                    process.env.AUTH_SECRET,
                    {
                      expiresIn: 86400, //24 hours
                    }
                  );

                  return res.status(200).send({
                    auth: true,
                    token,
                    user: {
                      id: user.id,
                      email: user.email,
                    },
                  });
                });
              }
            }
          });
        } catch (err) {
          return res.status(404).send({ msg: "Error" });
        }
      }
    });
};

module.exports = {
  userlogin,
  userregister,
  googlelogin,
};
