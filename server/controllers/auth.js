const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client("160442659190-j07774osftuemmojlusfe7i5dbif25v2.apps.googleusercontent.com")
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
dotenv.config()
const { auth } = require('../middleware/authMiddleware')

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

const authUser = ((req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.send({
            auth: true,
            user
        }))
})

const googlelogin = (req, res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, 
        audience: "160442659190-j07774osftuemmojlusfe7i5dbif25v2.apps.googleusercontent.com" })
        .then((res) => {
            const {email_verified, name, email} = res.payload
            console.log(res.payload)
    })
}

const getAPIRecipes = async (req, res) => {
    const {query} = req.body
    const edamamFetch = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
    )

    const data = await edamamFetch.json()

    res.status(200).send(data.hits)
}

module.exports = { googlelogin, userlogin, userregister, getAPIRecipes}




// bcrypt.genSalt(8, (err, salt) => {
        //     bcrypt.hash(newUser.password, salt, (err, hash) => {
        //         if (err) throw err;
        //         newUser.password = hash
        //         newUser.save().then(user => {
                    
        //             jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
        //                 expiresIn: 86400 // 24 hours
        //             }, (err, token) => {
        //                 if (err) throw err;
        //                 res.status(200).send({
        //                     token,
        //                     user: {
        //                         id: user.id,
        //                         email: user.email
        //                     }
        //                 })
        //             })

        //         })
        //     })
        // })