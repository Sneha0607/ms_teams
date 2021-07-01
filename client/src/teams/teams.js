import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {db} from '../firebase';
import useStyles from './styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Grid } from '@material-ui/core';

const Teams = () => {

    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    

    //FETCHING TEAMS DATA FROM DATABASE
    useEffect(() => {
        db.collection("teams").onSnapshot(snapshot => {
            setTeams(snapshot.docs.map(doc => doc.data()))
        });
    }, [])

    
    // useEffect(() => {
    //     const fetchTeams = async () => {
    //         const teamsCollection = await db.collection("teams").get();
    //         setTeams(teamsCollection.docs.map(doc => {
    //             return doc.data();
    //         }))
    //     }
    //     fetchTeams();
    // }, [])



    return (

        <div className={classes.content}>

        <div className={classes.grow}>
            <AppBar position="static" className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Teams
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>  
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Join or create team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/join-create'>
                                <GroupAddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.sectionMobile}>
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Join or create team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/join-create'>
                                <GroupAddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>

            <Grid 
            container 
            className={classes.grid}
            spacing={5}
        >
            {
                teams.map(
                    (team)=>{ 
                        return (
                            
                            <Grid item xs={12} md={6} lg={4} key={team.code} className={classes.gridItem}>
                                <Link to={`/teams/${team.code}`} className={classes.link}>
                                <div className={classes.paper}>
                                    <div align='center'>
                                        {team.avatar ? 
                                        <img
                                        height='80vw'
                                        width='80vw' 
                                        src={team.avatar} 
                                        alt='avatar'
                                    />
                                    :
                                    <img 
                                        height='80vw'
                                        width='80vw'
                                        src={process.env.PUBLIC_URL + 'images/avatar1.png'} 
                                        alt='avatar'
                                    />
                                    }
                                    
                                    </div>
                                    <Typography 
                                        align='center'
                                        variant='h5'
                                    >
                                        {team.name}
                                    </Typography>
                                    <Typography
                                        align='center'
                                       
                                    >
                                        Created on {new Date(team.createdAt.seconds * 1000).toLocaleDateString("en-US")}
                                    </Typography>
                                </div>
                                </Link>
                            </Grid>
                        ) 
                    }
                )
            }
        </Grid>
        </div>

        <div>

            {/* <Link to={`/rooms/${id}`} key={id}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
            </Link> */}
            
        </div>
    </div>
    )
}

export default Teams;