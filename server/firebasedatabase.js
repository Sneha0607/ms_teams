import admin from 'firebase-admin';
import serviceKey from './teams-4ca3f-firebase-adminsdk-hpwfs-21d18fc7b4.json';
admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
    databaseURL: 'https://teams-4ca3f-default-rtdb.firebaseio.com/'
});
var db = admin.database();
export default db;