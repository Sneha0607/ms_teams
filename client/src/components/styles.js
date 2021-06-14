import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '5%';

const useStyles = makeStyles((theme) => ({
    
    body: {
        margin: "0",
        padding: "0",
    },

    root: {
        width: drawerWidth,
        display: 'flex',
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#464775"
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
          fontSize: '1.25rem',
          marginLeft: theme.spacing(2),
          
        },
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

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: '#ebebeb',
    },

    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#ebebeb'
    },

    drawerContainer: {
        overflow: 'auto',
        backgroundColor: '#ebebeb'
    },
    
    menuItem: {
        '&:hover': {
            backgroundColor: '#f5f5f5'
        },
        '&:selected': {
            backgroundColor: '#f5f5f5'
        }
    },

    icons: {
        color: '#929295',
        fontSize: 30,
        '&:hover': {
            color: '#464775'
        },
        '&:selected': {
            color: '#464775'
        }
    }
}));
  
export default useStyles;