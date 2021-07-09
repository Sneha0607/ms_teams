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

  posts: {
    border: '1px solid #c4c4c4',
    marginBottom: '2%',
    backgroundColor: '#ffffff',
    width: '80vw',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5%',
    }
  },

  icon: {
    height: '2%', 
    width: '3%', 
    margin: '1%',
    [theme.breakpoints.down('sm')]: {
      height: '6%',
      width: '6%'
    }
  }
}));
  
export default useStyles;