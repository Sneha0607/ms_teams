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
  }

}));
  
export default useStyles;