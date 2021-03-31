import React, {EventHandler, useState}from "react"
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { Button, Container, CssBaseline, TextField, Typography, Link } from "@material-ui/core"
import {login} from "../Network/API"
import Cookies from 'js-cookie'
import {googleLogin} from '../Network/API'
import '../Styles/LoginForm.scss'


const Login = () => {

    const [userEmail, setEmail] = useState("Email Address")
    const [userPassword, setPassword] = useState("Password")

    const handleLogin = async (event: {preventDefault: () => void }) => {
        event.preventDefault()
        const response = await login({
            email: userEmail,
            password: userPassword
        })

        console.log(response)
        console.log(response.user.email)
        localStorage.setItem("userName", response.user.email)
        Cookies.set("x-auth-token", response.token)
        window.location.reload(true)


    }
    return (
        <div>
        <div className="Login">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography 
                 component="h1" 
                 variant="h2" 
                 align="center"
                > 
                    Sign in
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
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
                        label="Password"
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
                    <Link href="/register" variant="h5">
                      Don't have an account? Sign Up
                    </Link>
                </form>
            </Container>
        </div>
        <div className="googleBtn"> 
            <GoogleLogin
                clientId="160442659190-j07774osftuemmojlusfe7i5dbif25v2.apps.googleusercontent.com"
                // render={renderProps => (
                //     <button onClick={renderProps.onClick} style={
                //         {
                //             backgroundColor: "#34a853",
                //             color: "#ffffff",
                //             fontFamily: "Open Sans, sans-serif",
                //             fontSize: "1.5em",
                //             border: "none",
                //             borderBottom: ".15em solid black",
                //             borderRadius: "3px",
                //             padding: "0.5em 1.3em"
                //         }
                //     }>Login with Google</button>
                //   )}
                buttonText="Login with Google"
                onSuccess={ async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                console.log("success")
                const googleResponse = res as GoogleLoginResponse
                    if (googleResponse){
                        const response = await googleLogin({tokenId: googleResponse.tokenId})
                        const {auth, token, user} = response
                            if (auth){
                                console.log(user.email)
                                localStorage.setItem("userName", user.email)
                                Cookies.set("x-auth-token", token)
                                window.location.reload(true)
                            } else {
                                alert("There has been an error")
                            }
                        }   
                    }}
                onFailure={(res: any) => {
                    console.log("error")
                    console.log(res)
                }}
                cookiePolicy={"single_host_origin"}
            />   
        </div>
        </div>
    )
}

export default Login
