import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import useStyles from './styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Grid } from '@material-ui/core';
import Avatar from 'react-avatar';

const Teams = () => {

    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    
    //FETCHING TEAMS DATA FROM DATABASE
    useEffect(() => {
        db.collection("teams").onSnapshot(snapshot => {
            setTeams(snapshot.docs.map(doc => doc.data()))
        });
    }, [])


    return (

        <div className={classes.content}>

        <div className={classes.grow}>

            {/* TOP BAR IN TEAMS SECTION */}

            <AppBar 
                position="static" 
                className={classes.appbar} 
                elevation={0}
            >
                <Toolbar>
                    <Typography 
                        className={classes.title} 
                        variant="h6" 
                        noWrap
                    >
                        All Teams
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>  
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Create a team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/create-team'>
                                <GroupAddIcon/>
                                <Typography variant='body2'>Create a team</Typography>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.sectionMobile}>
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Create a team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/create-team'>
                                <GroupAddIcon/>
                                <Typography variant='body2'>Create a team</Typography>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>

            {/* GRID TO DISPLAY ALL THE TEAMS */}

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
                                    <div align='center' style={{ margin: '3%' }}>
                                        <Avatar value={team.name} size='90' textSizeRatio={1.75}/>
                                    </div>
                                    <Typography
                                        align='center'
                                        variant='subtitle1'  
                                    >
                                        Created on {new Date(team.createdAt.seconds * 1000).toLocaleDateString("en-US")}, 
                                        at {new Date(team.createdAt.seconds * 1000).getHours()}:{new Date(team.createdAt.seconds * 1000).getMinutes()} hrs
                                    </Typography>
                                    <Typography
                                        align='center'
                                        variant='subtitle2'
                                    >
                                        by {team.creatorEmail}
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
    </div>
    )
}

export default Teams;