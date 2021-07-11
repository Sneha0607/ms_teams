import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import {Button, Grid, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const CreateTeam = () => {

    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [code , setCode] = useState();
    const [teamCreated, setTeamCreated] = useState(false);
    const [nameError, setNameError] = useState('');
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    //FUNCTION TO GENERATE TEAM CODE
    const handleGenerateCode = (e) => {
        e.preventDefault();
        if(name === '') {
            setNameError('Name is Required');
            return;
        }
        const newCode = Date.now();
        setCode(newCode);
        setTeamCreated(true);

        //PUSHING TEAM DATA IN DATABASE
        const teamRef = db.doc(`teams/${newCode}`);
        teamRef.set({
            name: name, code: newCode, createdAt: new Date(), creatorId: currentUser.uid, creatorEmail: currentUser.email
        })

        //PUSHING IN USER ACTIVITY
        db.collection("users").doc(currentUser.uid).collection("activity")
        .add({
            activity: `You created a team: ${name}`,
            doneAt: new Date()
        })

        history.push(`teams/${newCode}`);
        
    }

    //FETCHING TEAMS DATA FROM DATABASE
    useEffect(() => {
        db.collection("teams").onSnapshot(snapshot => {
            setTeams(snapshot.docs.map(doc => doc.data()))
        });
    }, [])

    //FETCHING USERS DATA FROM DATABASE
    useEffect(() => {
        db.collection(`users`).onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        });
    }, [])


    return (
        <div style={{ alignContent: 'center' }}>
            <Grid container style={{ marginTop: '10vh', marginLeft: '10vw', marginRight: '10vw', alignItems: 'center' }} >
                
                {/*CREATE A TEAM*/}
                
                <Grid item xs={12} lg={3} md={6} style={{ margin: '10vh 20vw', padding: '3vw', border: '1px solid #000000' }}>
                    <Typography variant = "h5" align = "left" color = "textPrimary" style={{ margin: '2%', fontWeight: 'bold' }}>
                        Create a Team
                    </Typography>
                    <form onSubmit={handleGenerateCode}>
                        {nameError && <Alert severity = "error">{nameError}</Alert>}
                       <TextField 
                            id="filled-basic" 
                            color = "primary" 
                            placeholder = 'Enter Team Name'
                            onChange = {(e)=>{setName(e.target.value)}}
                            error = {nameError} 
                        />
                        {teamCreated ? (
                            <Typography>
                                Team succesfully created!! Your team code is {code}
                            </Typography>
                        ):(
                            <Button 
                                type = "submit" 
                                variant = "contained" 
                                fullWidth 
                                style={{ marginTop: '5%', backgroundColor: '#6264a7', color: '#ffffff' }}
                            >
                                Create Team
                            </Button>
                        )}
                    </form>
                    <Typography 
                        variant='caption'
                        style={{ marginTop: '5vh' }}
                    >
                        The team will be public and accessible by all users!
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateTeam;