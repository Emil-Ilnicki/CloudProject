import React, { useState } from 'react'
import { Button, Container, CssBaseline, TextField, Typography, Link } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {register} from "../Network/API"
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme : Theme) => 
    createStyles({
        resize: {
            fontSize: "medium"
        }
    })
)

const Register = () => {

    const classes = useStyles()
    const [userEmail, setEmail] = useState("")
    const [userPassword, setPassword] = useState("")

    const handleRegister = async (event: {preventDefault: () => void }) => {
        event.preventDefault()
        const res = await register({
            email: userEmail,
            password: userPassword
        })
        
        console.log(res)
        if (res.msg === "User already exists"){
            window.alert("This user already exists!")
        } else {
            window.alert("User has been Registered!")
            Cookies.set("x-auth-token", res.token)
            window.location.reload(true);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Typography component="h1" 
                 variant="h2" 
                 align="center">
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    InputProps = {{
                        classes: {
                            input: classes.resize,
                        }
                    }}
                    InputLabelProps = {{
                        classes: {
                            root: classes.resize,
                        }
                    }}
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
                    InputProps = {{
                        classes: {
                            input: classes.resize,
                        }
                    }}
                    InputLabelProps = {{
                        classes: {
                            root: classes.resize,
                        }
                    }}
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
                <Link href="/" variant="h5">
                    Already have an account? Sign in
                </Link>
            </form>
        </Container>
    )
}

export default Register