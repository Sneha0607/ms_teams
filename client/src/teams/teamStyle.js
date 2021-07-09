import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginTop: '10vh',
    marginLeft: '10vw',
    backgroundColor: '#f5f5f5',
    color: '#000000',
  },

  menuButton: {
    marginLeft: '5vw',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: '10vh',
    marginLeft: '5vw',
    backgroundColor: '#f0f0f0',
    borderLeft: '1px solid #92a7a7',
    [theme.breakpoints.down('md')]: {
      marginLeft: '7vw'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '9vw'
    }
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  teamAvatar: {
    marginLeft: '3vw',
    marginRight: '1vw',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
    }
  },

  meetButton: {
    marginLeft: '5vw',
    backgroundColor: '#ffffff',
    border: '1px solid #929292',
    borderRadius: '0',
    textTransform: 'none'
  },

  keyboard: {
    position: 'relative',
    borderRadius: '0',
    border: '1px solid #929292',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  
  keyboardIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));

export default useStyles;