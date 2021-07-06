import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    /***********NAVBAR STYLES**********/
    body: {
        margin: "0",
        padding: "0",
    },

    navbarRoot: {
        flexGrow: 1,
    },

    navbar: {
        width: '100%',
        backgroundColor: "#ffffff",
    },

    logo: {
        height: '3%',
        width: '3%',
    },

    navbarTitle: {
        flexGrow: 1,
        color: '#000000'
    },
    
    navbarButton: {
        backgroundColor: '#4b53bc',
        margin: '5px',
        color: '#ffffff',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#4b53bc',
            textDecoration: 'underline'
        }
    },

    blueBox: {
        height: '8vh',
        width: '100vw',
        backgroundColor: '#4b53bc',
        [theme.breakpoints.down('md')]: {
            height: '10vh'
        }
    },

    blueTag: {
        margin: '1%',
        textAlign: 'center',
    },

    /**********HOME STYLES**********/
    homeRoot: {
        flexGrow: 1,
    },

    paper: {
      padding: theme.spacing(10),
      textAlign: 'left',
      //backgroundColor: '#f5f5f5'
    },

    homeTitle: {
        color: '#4b53bc',
        fontWeight: 'bold'
    },

    tagline: {
        color: '#000000'
    },

    img: {
        height: '90vh',
        width: '1',
        overflow: 'hidden',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        display: 'flex',
    },

    signupButton: {
        backgroundColor: '#4b53bc',
        margin: '5px',
        color: '#ffffff',
        width: '18vw',
        borderRadius: 0,
        textTransform: 'none',
        border: '2px solid',
        borderColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#363c90',
            borderColor: '#f5f5f5',
        }
    },

    signinButton: {
        backgroundColor: '#ffffff',
        margin: '5px',
        color: '#000000',
        width: '18vw',
        borderRadius: 0,
        textTransform: 'none',
        border: '2px solid',
        borderColor: '#4b53bc',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#363c90'
        }
    },

    /**********SIGNUP AND SIGNIN STYLES**********/
    signin:{
        margin: "10vh auto",
        padding: 10,
        height: '80vh',
        width: '30vw',
        backgroundColor: '#ffffff',
        [theme.breakpoints.down('md')]: {
            width: '50vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '80vw'
        }
    },

    bigLogo: {
        height: '8%',
        width: '10%',
    },

    textField: {
        marginTop: "10px",
        width: '100%',
        height: '5%'
    },

    signup:{
        margin: "5vh auto",
        padding: 10,
        height: '90vh',
        width: '30vw',
        backgroundColor: '#ffffff',
        [theme.breakpoints.down('md')]: {
            width: '50vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '80vw'
        }
    },

    buttonSignup: {
        marginTop: '2%'
    },

    buttonSignin: {
        marginTop: '2%'
    },

    image: {
        marginTop: '5%',
        width: '50vw'
    },
    
    footerSigninButton: {
        backgroundColor: '#4b53bc',
        margin: '5px',
        color: '#ffffff',
        fontWeight: 'bold',
        width: '12vw',
        borderRadius: 0,
        textTransform: 'none',
        border: '2px solid',
        borderColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#363c90',
            borderColor: '#f5f5f5',
        }
    },

    footerSignupButton: {
        backgroundColor: '#ffffff',
        margin: '5px',
        color: '#4b53bc',
        fontWeight: 'bold',
        width: '12vw',
        borderRadius: 0,
        textTransform: 'none',
        border: '2px solid',
        borderColor: '#4b53bc',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#363c90'
        }
    },

    listIcon: {
        color: '#f5f5f5',
        fontSize: '2rem'
    },

    listText: {
        color: '#f5f5f5',
        padding: '2%',
        fontSize: '2rem',
        fontWeight: 'bold'
    },

    /**********FOOTER STYLES**********/
    footerHeading: {
        color: '#737373',
        fontWeight: 'bold'
    },

    footerList: {
        color: '#737373',
        fontSize: '0.75rem'
    }

}));

export default useStyles;