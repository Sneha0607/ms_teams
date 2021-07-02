import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    tasks: {
        textAlign: 'center',
        marginTop: '10vh',
        marginLeft: '3vw',
    },
      
    tasksHeader: {
        minHeight: '5vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'black',
        padding: '1%'
    },    

    form: {
        padding: '1vh'
    },

    paper: {
        position: "center",
        left: 400,
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    buttonUpload: {
        width: 100,
        margin: '1vw'
    },
    
    buttonDone: {
        width: 100,
        margin: '1vw',
        backgroundColor: '#0da63d',
        '&:hover': {
            fontWeight: 'bold',
            backgroundColor: '#0da63d',
        }
    },

    buttonEdit: {
        width: 100,
        margin: '1vw',
        backgroundColor: '#2a0c8a',
        '&:hover': {
            fontWeight: 'bold',
            backgroundColor: '#2a0c8a',
        }
    },

    tasksList: {
        textAlign: 'center',
        flexDirection: 'column',
        height: '3vw',
        paddingLeft: '5%',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '7%'
        }
    },
}));
  
export default useStyles;