import React, { useState, useEffect } from 'react';
import { AppBar, CssBaseline, Avatar, Drawer, Hidden, List, Toolbar, IconButton, Typography, ListItem, Button, 
  InputBase } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { db } from '../firebase';
import { useLocation } from 'react-router';
import useStyles from './teamStyle';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { v1 as uuid } from "uuid";
import { useHistory } from 'react-router';

const Team = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [teams, setTeams] = useState([]);
  const [code, setCode] = useState('')
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    db.collection("teams").onSnapshot(snapshot => {
        setTeams(snapshot.docs.map(doc => doc.data()))
    });
  }, [])

  //FETCHING THE PARTICULAR TEAM DETAILS FROM DATABASE
  const location = useLocation();
  const teamCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const create = () => {
    const id = uuid();
    history.push(`/room/${id}`);
    alert(`Copy your meeting code : ${id}`);
  }

  const join = (e) => {
    history.push(`/room/${code}`);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <Button href='/teams' startIcon={<ArrowBackIosIcon/>}>All Teams</Button>
        </ListItem>
        {
          teams.map(
            (team)=>{ 
              if(team.code == teamCode)
              return (
                <>
                  <ListItem>
                    {
                      team.avatar ? 
                      <img height='100vh' width='100vh' src={team.avatar}/>
                      :
                      <img height='100vh' width='100vh' src={process.env.PUBLIC_URL + '/images/avatar1.png'} />
                    }
                    
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6'>{team.name}</Typography>
                  </ListItem>
                </>
              ) 
            }
          )
        }
        <ListItem style={{ backgroundColor: '#ffffff' }}>
          General
        </ListItem>
      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {
            teams.map(
              (team)=>{ 
                if(team.code == teamCode)
                return (
                  <>
                      {
                        team.avatar ? 
                        <Avatar src={team.avatar} className={classes.teamAvatar}/>
                        :
                        <Avatar src={process.env.PUBLIC_URL + '/images/avatar1.png'} className={classes.teamAvatar}/>
                      }
                      <Typography variant='h6' className={classes.teamName} noWrap>{team.name}</Typography>
                  </>
                ) 
              }
            )
          }

          <Button
            onClick={create}  
            className={classes.meetButton} 
            startIcon={<VideoCallIcon/>}
          >
            Meet
          </Button>

          <form onSubmit={join}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <KeyboardIcon />
            </div>
            <InputBase
              placeholder="Enter code to join"
              value={code}
              onChange = {(e)=>setCode(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button  
            type='submit'
            style={{ display: 'none' }}>
            Join
          </Button>
          </form>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
      </main>
    </div>
  );
}

export default Team;