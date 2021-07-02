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
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const [fileUrl, setFileUrl] = useState(null);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file).then(() => {
            console.log("Uploaded File", file.name);
        });
        console.log(fileUrl);
        setFileUrl(await fileRef.getDownloadURL());
    }

    //FUNCTION TO GENERATE TEAM CODE
    const handleGenerateCode = (e) => {
        e.preventDefault();
        const newCode = Date.now();
        setCode(newCode);
        setTeamCreated(true);
        const team = {
          name: name,
          code: newCode,
          creatorid: currentUser.uid,
          avatar: fileUrl
        }

        //PUSHING TEAM DATA IN DATABASE
        const teamRef = db.doc(`teams/${team.code}`);
        teamRef.set({
            name, code: team.code, createdAt: new Date(), creatorid: team.creatorid, avatar: fileUrl
        })

        //PUSHING IN USER ACTIVITY
        db.collection("users").doc(currentUser.uid).collection("activity")
        .add({
            activity: `You created a team: ${name}`,
            doneAt: new Date()
        })

        history.push(`teams/${newCode}`);
        
        //setFileUrl(null);
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
                        <input
                            type='file'
                            onChange={onFileChange}
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

            </Grid>
        </div>
    )
}

export default JoinTeam;