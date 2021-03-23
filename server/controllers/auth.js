const {OAuth2Client} = require('google-auth-library')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
dotenv.config()
const client = new OAuth2Client(process.env.GOOGLE_OATUH_CLIENTID)
const DB_HELPER_URL = 'http://localhost:4001'

const defaultHeaders = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  };

const userlogin = (req,res) => {
    const { email, password } = req.body
 
    if(!email || !password){
        res.status(400).send({ msg: "Please enter all fields"})
    }

    try {
        User.findOne({ email }, (err, user) => {
            if (err) return res.status(500).send({ msg: "Error on the server" })
            if(!user) return res.status(404).send({ msg: "This user does not exist" })
    
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if(!passwordIsValid){
                return res.status(401).send({ auth: false, token: null })
            }
            const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
                expiresIn: 86400 // 24 hours
            });
    
            res.status(200).send({ 
                auth: true, 
                token , 
                user: {
                    id: user.id,
                    email: user.email
                }})
        })
    }catch (error) {
        return res.status(404).send({ msg: "Error"})
    }

}

const userregister = (req,res) => {
    const { email, password } = req.body
    console.log(email +  " " + password)
    
    if (!email || !password){
        res.status(400).send({ msg: "Please enter all fields"})
    }

    User.findOne({ email }).then(user => {
        if (user) return res.status(400).send({ msg: "User already exists" }) // if user exists

        const salt = bcrypt.genSaltSync(8)
        const hasedPassword = bcrypt.hashSync(password, salt)

        const newUser = new User({
            email,
            password: hasedPassword
        })

        newUser.save().then(user => {
            const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
                expiresIn: 86400, //24 hours
            })

            res.status(200).send({
                auth: true,
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            })
        })
    })
}

// const authUser = ((req, res) => {
//     User.findById(req.user.id)
//         .select('-password')
//         .then(user => res.send({
//             auth: true,
//             user
//         }))
// })

const googlelogin = (req, res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_OATUH_CLIENTID })
        .then((response) => {
            const {email_verified, email} = response.payload
            if (email_verified){
                try {
                    User.findOne({ email }, (err,user) => {
                        if (err) {
                            return res.status(500).send({ msg: "Error on the server" })
                        }
                        else {
                            if(user){
                                console.log("Login Google Auth")
                                const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
                                    expiresIn: 86400, //24 hours
                                })
                                return res.status(200).send({
                                    auth: true,
                                    token,
                                    user: {
                                        id: user.id,
                                        email: user.email
                                    }
                                })
                            } else {
                                console.log("Register Google auth")
                                const password = email+process.env.AUTH_SECRET
                                const newUser = User({
                                    email,
                                    password
                                })
                                newUser.save().then((err, user) => {
                                    if(err) return res.status(500).send({msg: "Something went wrong"})

                                    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
                                        expiresIn: 86400, //24 hours
                                    })
                            
                                    return res.status(200).send({
                                        auth: true,
                                        token,
                                        user: {
                                            id: user.id,
                                            email: user.email
                                        }
                                    })

                                })
                            }
                        }
                    })

                } catch (err){
                    return res.status(404).send({ msg: "Error"})
                }
            }
    })
}

const getAPIRecipes = async (req, res) => {
    const {query, healthLabel} = req.body
    console.log(req.body)
    if(healthLabel === "none") {
        console.log("In none")
        const edamamFetch = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)

        const data = await edamamFetch.json()
        res.status(200).send(data.hits)

    } else {
        console.log("In else")
        const edamamFetch = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&health=${healthLabel}`)
            
        const data = await edamamFetch.json()
        res.status(200).send(data.hits)
    }
}

const dbHelperAddEdamamRecipe = async (req, res) => {
    console.log(req.body)
    const requestOptions = { 
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify(req.body)
    }
    const response = await fetch(`${DB_HELPER_URL}/db/addEdamamRecipe`, requestOptions)
        .then((res) => console.log(res))
        .then((data) => console.log(data))
    
    res.status(200).send({msg: 'response'})
}

const dbHelperGetRecipes = async (req, res) => {
    console.log(req.body)
    const requestOptions = { 
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify(req.body)
    } 
    const response = await fetch(`${DB_HELPER_URL}/db/getRecipe`, requestOptions)
        .then(res => res.json())
        .then(data => data)

    res.status(200).send({
        response
    })
}

const dbHelperDeleteRecipe = async (req,res) => {
    console.log(req)
    const requestOptions = { 
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify(req.body)
    }
    const reponse = await fetch(`${DB_HELPER_URL}/db/deleteRecipe`, requestOptions)
    
    res.status(200).send({msg: "success"})
}

const dbHelperAddUserRecipe = async (req,res) => {
    const requestOptions = { 
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify(req.body)
    }
    const response = await fetch(`${DB_HELPER_URL}/db/addUserRecipe`, requestOptions)
        .then((res) => console.log(res))
        .then((data) => console.log(data))
    
    res.status(200).send({msg: 'response'})

}

module.exports = {googlelogin, 
    userlogin, 
    userregister, 
    getAPIRecipes, 
    dbHelperAddEdamamRecipe, 
    dbHelperGetRecipes, 
    dbHelperDeleteRecipe,
    dbHelperAddUserRecipe}



