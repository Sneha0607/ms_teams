import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '5vw';

const useStyles = makeStyles((theme) => ({

  content: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    backgroundRepeat: 'repeat',
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
    marginLeft: '8vw',
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
    marginTop: '18vh',
    marginLeft: '30vw',
    align: 'center'
  },

  newMeeting: {
    fontSize: '1rem',
    backgroundColor: '#464775',
    color: '#ffffff',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#464775',
      fontWeight: 'bold'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.75rem',
      padding: 0,
      width: '30vw',
      height: '5vh'
    }
  },

  codeText: {
    height: '2vh',
    width: '20vw',
    marginLeft: '2vh',
    marginRight: '2vh',
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
      height: '3vh',
      width: '35vw'
    }
  },

  joinButton: {

    fontSize: '1rem',
    backgroundColor: '#464775',
    color: '#ffffff',
    marginTop: '2vh',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#464775',
      fontWeight: 'bold'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.75rem',
      padding: 0,
      width: '30vw',
      height: '5vh'
    }
  },

  toolbar: {
    overflow: 'auto'
  },

  controlsContainer: {
    position: 'absolute',
    bottom: '0',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '4rem',
    zIndex: '999',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  iconContainer: {
    borderRadius: '50%',
    border: '1px solid var(--primary-color)',
    width: '0.25rem',
    height: '0.25rem',
    cursor: 'pointer',
    backgroundColor: 'var(--primary-color-hover)',
    boxShadow: 'var(--lift-shadow)',
    transition: 'background-color .2s cubic-bezier(.4,0,.2,1)',
    '&:hover': {
      backgroundColor: 'rgba(var(--color-background),0.2)'
    }
  },

  text: {
    padding: theme.spacing(2, 2, 0),
  },

  controls: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#393838',
    alignItems: 'center'
  },

  controlsToolbar: {
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0',
      marginLeft: '0'
    }
  },

}));
  
export default useStyles;