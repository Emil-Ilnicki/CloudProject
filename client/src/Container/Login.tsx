import React, {EventHandler, useState}from "react"
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { Button, Container, CssBaseline, TextField, Typography, Link } from "@material-ui/core"
import {login} from "../Network/API"
import Cookies from 'js-cookie'


const Login = () => {

    const [userEmail, setEmail] = useState("Email Address")
    const [userPassword, setPassword] = useState("Password")

    const handleLogin = async (event: {preventDefault: () => void }) => {
        console.log(typeof event)
        event.preventDefault()
        const res = await login({
            email: userEmail,
            password: userPassword
        })

        console.log(res)
        Cookies.set("x-auth-token", res.token)
        window.location.reload(true)


    }
    return (
        <div className="Login">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={userEmail}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={userPassword}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >      
                        Sign In
                    </Button>
                    <Link href="/register" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                </form>
            </Container>
           
        </div>
    )
}

export default Login

{/* <GoogleLogin
                clientId="160442659190-j07774osftuemmojlusfe7i5dbif25v2.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                    console.log("success")
                    const googleResponse = res as GoogleLoginResponse
                    if (googleResponse){
                        axios({
                            method: "POST",
                            url: "http://localhost:4000/api/googlelogin",
                            data: {tokenId: googleResponse.tokenId}
                        }).then((res) => {
                            console.log(res)
                        })
                    }
                    
                }}
                onFailure={(res: any) => {
                    console.log("error")
                    console.log(res)
                }}
                cookiePolicy={"single_host_origin"}
            /> */}