import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    
  body: {
    margin: "0",
    padding: "0",
  },

  titleText: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#dadae3",
    '&:hover': {
      backgroundColor: "#dadae3",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(15),
      width: '50%',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#929295'
  },

  inputRoot: {
    color: '#50538d',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#000000',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
          color: '#000000',
          width: '100%',
      }
    },
  },

  grow: {
    flexGrow: 1,
  },

  sectionDesktop: {
    display: 'flex'
  },
    
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  
  icons: {
    color: '#929295',
    '&:hover': {
        color: '#464775'
    },
    '&:selected': {
        color: '#464775'
    }
  },

  logoutIcon: {
    color: '#9d2f42',
    '&:hover': {
        color: '#9d2f42'
    },
    '&:selected': {
        color: '#9d2f42'
    }
  },

  navbarRoot: {
      display: 'flex',
  },

  navbar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#464775",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: 36,
  },

  hide: {
    display: 'none',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#ebebeb'
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#ebebeb'
  },

  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
    backgroundColor: '#ebebeb',
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
}));
  
export default useStyles;