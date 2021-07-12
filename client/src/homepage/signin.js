import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import useStyles from './styles';
import {Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Signin = () => {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    //LOGIN FUNCTION: Checking Firebase Authentication 

    const handleLogin = (e) => {
        e.preventDefault();
        if(email === ''|| password ==='') {
            return setEmailError('All fields are required!');
        }
        
        auth.signInWithEmailAndPassword(email, password)
        .then(()=>{history.push('/teams');})
        .catch(err=>{
            switch(err.code) {
                case "auth/user-not-found":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message); 
                    break; 
                default: break;         
            }
        });
    }

    return(
       <main>
            <Grid 
                container 
                style={{background: 'linear-gradient(to right bottom, #eee7cc, #dbe3e9)'}}
            >
                <Grid 
                    item 
                    className={classes.signin}
                >
                    <img 
                        className={classes.bigLogo} 
                        src={process.env.PUBLIC_URL + 'images/teams.png'} 
                        alt="ms_logo"
                    />
                    <Typography 
                        variant = "h5" 
                        align = "left" 
                        color = "textPrimary" 
                        family = "Roboto" 
                        gutterBottom
                    >
                        Sign in
                    </Typography>

                    {/* FORM TO SUBMIT USER EMAIL AND PASSWORD TO SIGN IN */}

                    <form onSubmit = {handleLogin}>
                        {emailError && <Alert severity = "error">{emailError}</Alert>}
                        {passwordError && <Alert severity = "error">{passwordError}</Alert>}
                        <TextField 
                            className = {classes.textField} 
                            variant = "outlined" 
                            color = "primary"  
                            label = "E-mail"  
                            onChange = {(e)=>{setEmail(e.target.value)}} 
                            error = {emailError} 
                        />
                        <TextField 
                            className = {classes.textField} 
                            variant = "outlined" 
                            color = "primary"  
                            label = "Password" 
                            type = "Password" 
                            onChange = {(e)=>{setPassword(e.target.value)}} 
                            error = {passwordError}
                        />
                        <Button 
                            className = {classes.buttonSignin} 
                            color = "primary" 
                            type = "submit" 
                            variant = "contained" 
                            fullWidth 
                        >
                            Sign in
                        </Button>
                    </form>

                    <FormControlLabel 
                        control = {<Checkbox name = "rememberMe" color = "primary"/>} 
                        label = "Remember me"
                    />
                    
                    <p>
                        <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                            <Link href = "#" >Forgot Password?</Link>
                        </Typography>
                    </p>
                    <p>
                       <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                            No account? 
                            <Link href = "/signup"> Create one! </Link>
                            instead     
                       </Typography></p>
                </Grid>
            </Grid>
       </main>
    );
}

export default Signin;