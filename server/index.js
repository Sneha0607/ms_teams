import express from 'express';
const app = express();

import db from './firebasedatabase.js';
import cors from 'cors';

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.port || 5000;
app.get('/', (req, res)=>{
    res.send('Server is running!');
});

//User created in database

app.post('/createuser', function(req, res){
    const newUser = {
        Name: req.body.displayname,
        Email: req.body.email,
        Password: req.body.password,
        userid: req.body.userid
    };
    db.ref('users/' + newUser.userid).set({
        name: newUser.Name,
        email: newUser.Email,
        password: newUser.Password,
        userid:newUser.userid
    });
    console.log(newUser);

});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));