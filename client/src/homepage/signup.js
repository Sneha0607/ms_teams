import React, { useState } from 'react';
import {useHistory} from 'react-router';
import firebase from '../firebase';
import axios from 'axios';
import useStyles from './styles';
import {Button, Grid, Link, TextField, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Signup = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    const history = useHistory();

    const handleSignup = (e) => {
        e.preventDefault();
        setPasswordError('');
        setEmailError('');
        if(name===''){
            setNameError('Name is Required');
            return;
        }
        if(password !== cpassword){
            setPasswordError('Passwords do not match');
            return;
        }
        
        //Check authentication 
        firebase.auth().createUserWithEmailAndPassword(email, password).then((cred)=>{
            const newUser = {
                displayname: name,
                email: email,
                userid:cred.user.uid
            };
            console.log(newUser);
    
            axios.post('http://localhost:5000/createuser', newUser)
            .then(()=> console.log('User Registered!'))
            .catch(err=> {
                console.log(err);
            });
        }).then(()=>{history.push('/');})
        .catch(err=>{
            switch(err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message); 
                    break;  
                default: break;         
            }
        });       
    }

    return(
       <main>
           <Grid container style={{background: 'linear-gradient(to right bottom, #eee7cc, #dbe3e9)'}}>
               <Grid item className={classes.signup}>
                    <img className={classes.bigLogo} src={process.env.PUBLIC_URL + 'images/ms_logo.jpg'} alt="ms_logo"/>
                    <Typography variant = "h5" align = "left" color = "textPrimary" fontWeight="bold" gutterBottom>
                        Sign up
                    </Typography>
                    <form onSubmit = {handleSignup}>
                        {nameError && <Alert severity = "error">{nameError}</Alert>}
                        {emailError && <Alert severity = "error">{emailError}</Alert>}
                        {passwordError && <Alert severity = "error">{passwordError}</Alert>}
                        <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Name" onChange = {(e)=>setName(e.target.value)} error = {nameError} />
                        <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "E-mail id" type = "E-mail" onChange = {(e)=>setEmail(e.target.value)} error = {emailError} />
                        <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Create Password" type = "Password" onChange = {(e)=>setPassword(e.target.value)} error = {passwordError} />
                        <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Confirm Password" type = "Password" onChange = {(e)=>setCPassword(e.target.value)}/>
                        <Button className = {classes.buttonSignup} color = "primary" type = "submit" variant = "contained" fullWidth >Sign up</Button>
                    </form>
                    <p>
                        <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                            Already a user?
                            <Link href = "/signin"> Sign in </Link>
                            instead     
                        </Typography>
                    </p>          
                </Grid>
           </Grid>
       </main> 
    );
}

export default Signup;