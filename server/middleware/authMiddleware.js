const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// Going to be used to authenticate actions on the "git recipes, git exercies etc" tabs 
const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    console.log(token)

    if(!token) res.status(401).send({ auth: false })

    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET)
        req.user = decoded
        next();
    } catch (error) {
        if (error) return res.status(404).send({ msg: "Error"})
    }

}

module.exports = { auth }