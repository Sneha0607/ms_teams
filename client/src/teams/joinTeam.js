import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import firebase, { db } from '../firebase';
import {Button, Grid, TextField, Typography } from '@material-ui/core';

const JoinTeam = () => {

    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [code , setCode] = useState();
    const [teamCreated, setTeamCreated] = useState(false);
    const [input, setInput] = useState("");
    const [teams, setTeams] = useState([]);
    const history = useHistory();

    //FUNCTION TO GENERATE TEAM CODE
    const handleGenerateCode = (e) => {
        e.preventDefault();
        const newCode = Date.now();
        setCode(newCode);
        setTeamCreated(true);
        const team = {
          name: name,
          code: newCode,
          creatorid: currentUser.uid
        }

        //PUSHING TEAM DATA IN DATABASE
        const teamRef = db.doc(`teams/${team.code}`);
            teamRef.set({
                name, newCode, createdAt: new Date(), creatorid: team.creatorid
            })
    }

    //FETCHING TEAMS DATA FROM DATABASE
    useEffect(() => {
        db.collection("teams").onSnapshot(snapshot => {
            setTeams(snapshot.docs.map(doc => doc.data()))
        });
    }, [])

    //FUNCTION TO JOIN TEAM
    const handleJoinTeam = (e) => {
        e.preventDefault();
        const teamRef = db.collection("users").doc(currentUser.uid).collection("teams").doc(input);
        teams.map(
            (team)=>{
                if(team.code === input) {
                teamRef.set({
                    teamCode: input,
                    teamName: team.name,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                }  
            }
        )
        history.push(`my-teams/${input}`);
        setInput("");
    }


    return (
        <div>
            <Grid container style={{ marginTop: '10vh', marginLeft: '10vw', marginRight: '10vw' }} >
                
                {/*CREATE A TEAM*/}
                
                <Grid item xs={12} lg={3} md={6} style={{ margin: '10vh' }}>
                    <Typography variant = "h5" align = "left" color = "textPrimary">
                        Create a Team
                    </Typography>
                    <form onSubmit={handleGenerateCode}>
                       <TextField 
                            id="filled-basic" 
                            color = "primary" 
                            placeholder = 'Enter Team Name'
                            onChange = {(e)=>{setName(e.target.value)}} 
                        />
                       {teamCreated ? (
                            <Typography>
                                Team succesfully created!! Your team code is {code}
                            </Typography>
                        ):(
                            <Button 
                                color = "primary" 
                                type = "submit" 
                                variant = "contained" 
                                fullWidth 
                                style={{ margin: '1vh' }} 
                            >
                                Create Team
                            </Button>
                        )}

                    </form>
                </Grid>

                {/*JOIN A TEAM*/}

                <Grid item xs={12} lg={3} md={6} style={{ margin: '10vh' }}>
                    <Typography variant = "h5" align = "left" color = "textPrimary">
                        Join a Team with Code
                    </Typography>
                    <form onSubmit={handleJoinTeam}>
                       <TextField 
                            id="filled-basic" 
                            color = "primary" 
                            placeholder = 'Enter Code'
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                        />
                       <Button 
                            color = "primary" 
                            type = "submit" 
                            variant = "contained" 
                            fullWidth 
                            style={{ margin: '1vh' }} 
                        >
                           Join Team
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default JoinTeam;
