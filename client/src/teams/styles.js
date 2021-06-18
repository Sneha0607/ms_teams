import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '5vw';

const useStyles = makeStyles((theme) => ({

  content: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    backgroundRepeat: 'repeat'
  },
  
  body: {
    margin: "0",
    padding: "0",
  },

  root: {
    width: drawerWidth,
    display: 'flex',
  },
  
  grow: {
    flexGrow: 1,
  },

  appbar: {
    height: '8vh',
    width: '100vw',
    marginTop: '10vh',
    backgroundColor: '#f5f5f5'
  },

  menuButton: {
    marginRight: theme.spacing(2),
    color: '#000000'
  },

  title: {
    color: '#000000',
    marginLeft: '5vw',
    fontWeight: 'bold'
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  startMeeting: {
    marginTop: '20vh',
    marginLeft: '30vw',
    align: 'center'
  },

  newMeeting: {
    width: '20%',
    height: '8vh',
    fontSize: '1rem',
    backgroundColor: '#464775',
    color: '#ffffff',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#464775',
      fontWeight: 'bold'
    }
  },

  codeText: {
    marginTop: '5%',
    height: '7vh',
    width: '25%',
    borderRadius: '5px'
  },

  joinButton: {
    width: '10%',
    height: '7vh',
    fontSize: '1rem',
    backgroundColor: '#464775',
    color: '#ffffff',
    padding: '1%',
    marginTop: '5%',
    marginLeft: '1%',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#464775',
      fontWeight: 'bold'
    }
  }

}));
  
export default useStyles;