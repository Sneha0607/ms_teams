import express from 'express';
import cors from 'cors';
const app = express();
//const server = require("http").createServer(app);

//app.use(cors());

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


/*
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import db from './firebasedatabase.js';
import cors from 'cors';


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.port || 5000;
app.get('/', (req, res)=>{
    res.send('Home!');
});
app.post('/createuser', function(req, res){
    const newUser = {
        Name: req.body.displayname,
        Email: req.body.email,
        Username: req.body.username,
        Password: req.body.password,
        PhoneNo: req.body.phoneNo,
        userid: req.body.userid
    };
    db.ref('users/' + newUser.userid).set({
        username: newUser.Username,
        name: newUser.Name,
        email: newUser.Email,
        phoneNumber: newUser.PhoneNo,
        password: newUser.Password,
        userid:newUser.userid
    });
    console.log(newUser);

});
*/