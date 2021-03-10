import React, { useState } from 'react'
import { Button, Container, CssBaseline, TextField, Typography, Link } from "@material-ui/core"
import {register} from "../Network/API"
import Cookies from 'js-cookie'

const Register = () => {

    const [userEmail, setEmail] = useState("")
    const [userPassword, setPassword] = useState("")

    const handleRegister =  async (event : any) => {
        event.preventDefault()
        const res = await register({
            email: userEmail,
            password: userPassword
        })
        
        console.log(res.token)
    
        Cookies.set("x-auth-token", res.token)
        window.location.reload(true);

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
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
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    autoFocus 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >      
                    Register
                </Button>
                <Link href="/" variant="body2">
                    Already have an account? Sign in
                </Link>
            </form>
        </Container>
    )
}

export default Register