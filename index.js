const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const app = express();
const bodyParser=require('body-parser')
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
app.use(express.static('public'));
const port=3000;
const webpage=require(path.join(__dirname,'./routes/blogroutes.js'));
const accounts_page=require(path.join(__dirname,'./routes/accounts.js'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',webpage)
app.use('/account',accounts_page)
app.listen(port,()=>{
    console.log(`Code Blog listening at port http://localhost:${3000}/`)
})