const express = require('express');
const path = require('path');
const router = express.Router()
const app = express();
var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser')
router.get('/', (req, res) => {
    res.render("myaccount")
})
router.get('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password
    //const b=bcrypt.compareSync(bcrypt.hash(password,10),)
    res.render("login")
})
router.get('/signup', (req, res) => {
    res.render("signup")
})
router.post('/user', async (req, res) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    try {
        const hashpassword = await bcrypt.hash(password, 10)
        console.log(hashpassword)
        MongoClient.connect(url, (err, db)=> {
            if (err) throw err;
            dbo=db.db("Code-Blog");
            var user={
                firstName:fname,
                lastName:lname,
                username:username,
                email:email,
                password:hashpassword
            }
            dbo.collection('Users').insertOne(user,(err,res)=>{
                if (err) throw err
                console.log(`User Created Successfully with username ${username}`)
                db.close()
            });
        }
        )}
    catch {
        res.redirect('/account/signup')
    }

    res.redirect('/account/login')
})
module.exports = router