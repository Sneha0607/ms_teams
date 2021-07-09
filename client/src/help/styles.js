import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  
  root: {
    marginLeft: '10vw', 
    marginTop: '10vh',
  },

  title: {
    paddingTop: '3vh', 
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5%'
    }
  },

  listRoot: {
    width: '100%',
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
  },

  footer: {
    backgroundColor: 'inherit',
    color: '#000000'
  }

}));
  
export default useStyles;