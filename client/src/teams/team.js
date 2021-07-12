import React, { useState, useEffect } from 'react';
import { AppBar, CssBaseline, Drawer, Hidden, List, Toolbar, IconButton, ListItem, Button, InputBase, ListItemIcon,
    ListItemText, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { db } from '../firebase';
import { useLocation, useHistory } from 'react-router';
import useStyles from './teamStyle';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import DateRangeIcon from '@material-ui/icons/DateRange';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { v1 as uuid } from "uuid";
import { useAuth } from '../contexts/AuthContext';
import Posts from './posts';
import Avatar from 'react-avatar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#464775',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Team = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [teams, setTeams] = useState([]);
  const [code, setCode] = useState('')
  const history = useHistory();
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, onChange] = useState('10:00');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  /**********FETCHING TEAMS DATA FROM DATABASE**********/
  useEffect(() => {
    db.collection("teams").onSnapshot(snapshot => {
        setTeams(snapshot.docs.map(doc => doc.data()))
    });
  }, [])

  //FETCHING THE PARTICULAR TEAM CODE FROM URL
  const location = useLocation();
  const teamCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /*************CREATE MEETING FUNCTION************/

  const create = () => {
    const id = uuid();

    //PUSHING MEETING DATA IN DATABASE
    const teamRef = db.doc(`teams/${teamCode}/meetings/${id}`);
    teamRef.set({
      code: id, createdAt: new Date(), creatorId: currentUser.uid, creatorEmail: currentUser.email,
    })

    const meetingRef = db.doc(`meetings/${id}`);
    meetingRef.set({
      code: id, createdAt: new Date(), creatorId: currentUser.uid, creatorEmail: currentUser.email, 
    })

    //PUSHING PARTICIPANTS DATA IN DATABASE
    const participantsRef = db.doc(`teams/${teamCode}/meetings/${id}/participants/${currentUser.uid}`);
    participantsRef.set({
      email: currentUser.email, uid: currentUser.uid, joinedAt: new Date(),
    })

    const meetingParticipantsRef = db.doc(`meetings/${id}/participants/${currentUser.uid}`);
    meetingParticipantsRef.set({
      email: currentUser.email, uid: currentUser.uid, joinedAt: new Date(),
    })

    //PUSHING IN USER ACTIVITY
    db.collection("users").doc(currentUser.uid).collection("activity")
    .add({
        activity: `You created a meeting!`,
        doneAt: new Date()
    })

    history.push(`/room/${id}`);
    alert(`Copy your meeting code : ${id}`);
  }


  /**********SCHEDULING MEETING FUNCTION**********/
  
  const schedule = (e) => {
    e.preventDefault();
    const id = uuid();

    //PUSHING MEETING DATA IN DATABASE
    const teamRef = db.doc(`teams/${teamCode}/meetings/${id}`);
    teamRef.set({
      code: id, createdAt: selectedDate, time: value, creatorId: currentUser.uid, creatorEmail: currentUser.email,
    })

    const meetingRef = db.doc(`meetings/${id}`);
    meetingRef.set({
      code: id, createdAt: selectedDate, time: value, creatorId: currentUser.uid, creatorEmail: currentUser.email, 
    })

    //PUSHING IN USER ACTIVITY
    db.collection("users").doc(currentUser.uid).collection("activity")
    .add({
        activity: `You scheduled a meeting!`,
        doneAt: new Date()
    })

    setOpen(false);
  }


  /*************JOIN MEETING FUNCTION************/

  const join = (e) => {

    //PUSHING PARTICIPANTS DATA IN DATABASE
    const participantsRef = db.doc(`teams/${teamCode}/meetings/${code}/participants/${currentUser.uid}`);
    participantsRef.set({
      email: currentUser.email, uid: currentUser.uid, joinedAt: new Date(),
    })

    const meetingParticipantsRef = db.doc(`meetings/${code}/participants/${currentUser.uid}`);
    meetingParticipantsRef.set({
      email: currentUser.email, uid: currentUser.uid, joinedAt: new Date(),
    })

    //PUSHING IN USER ACTIVITY
    db.collection("users").doc(currentUser.uid).collection("activity")
    .add({
        activity: `You joined a meeting!`,
        doneAt: new Date()
    })

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
                <ListItem>
                  <Avatar value={team.name} size='100' textSizeRatio={1.75}/>                    
                </ListItem>
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

  /**********DATE PICKER**********/
  const handleClickOpenCalendar = () => {
    setOpen(true);
  };

  const handleCloseCalendar = () => {
    setOpen(false);
  };

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
                  <Avatar className={classes.teamAvatar} value={team.name} size='40' textSizeRatio={1.75} round={true}/>
                ) 
              }
            )
          }

          <Button
            onClick={handleClick}  
            className={classes.meetButton} 
            startIcon={<VideoCallIcon/>}
          >
            Meet
          </Button>

          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={create}>
              <ListItemIcon>
                <VideoCallIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Meet now" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleClickOpenCalendar}>
              <ListItemIcon>
                <DateRangeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Schedule a meeting" />
            </StyledMenuItem>
          </StyledMenu>

          <Dialog 
            fullWidth
            maxWidth='sm' 
            open={open} 
            onClose={handleCloseCalendar} 
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
                Choose date and time to schedule meeting
            </DialogTitle>
            <Divider />

            {/* FORM TO SCHEDULE A MEETING */}

            <DialogContent style={{ height: '50vh' }}>
              <form onSubmit={schedule}>
                <DatePicker
                  selected={selectedDate}
                  onChange={date=>setSelectedDate(date)}
                  dateFormat='MM/dd/yyyy'
                  minDate={new Date()}
                  isClearable
                  showYearDropdown
                  scrollableMothYearDropdown
                />
                  <TimePicker
                    onChange={onChange}
                    value={value}
                  />
                <Button
                  type='submit'
                >
                  Schedule Meeting
                </Button>
              </form>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleCloseCalendar} color="primary">
                    Close
                </Button>
            </DialogActions>
          </Dialog>

          <form onSubmit={join}>
          <div className={classes.keyboard}>
            <div className={classes.keyboardIcon}>
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
        <Posts />
      </main>
    </div>
  );
}

export default Team;