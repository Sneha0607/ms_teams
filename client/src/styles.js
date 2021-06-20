import { makeStyles, rgbToHex } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto', 
        bottom: '0.15%', 
        paddingLeft: '10vw', 
        backgroundColor: '#f5f5f5', 
        color: '#000000', 
        height: '4vw'
    },

    hearButton: {
        fontSize: 'large',
        color: '#000000',
        '&:hover': {
            color: '#464775',
            fontWeight: 'bold'
        }
    }
}));
    
export default useStyles;