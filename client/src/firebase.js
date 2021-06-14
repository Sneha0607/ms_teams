import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdEOdHz2SB6tAS-pabNgMGBGoHs7ROw-w",
    authDomain: "teams-4ca3f.firebaseapp.com",
    projectId: "teams-4ca3f",
    storageBucket: "teams-4ca3f.appspot.com",
    messagingSenderId: "416771298043",
    appId: "1:416771298043:web:b20e66784b82e0981cd65e",
    measurementId: "G-DKCFXEGEYM"
};

firebase.initializeApp(firebaseConfig);
export default firebase;