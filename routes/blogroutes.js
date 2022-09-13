const express=require('express');
const path=require('path');
const router=express.Router()
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var a;
router.get('/',(req,res)=>{
    res.render('home')
})
router.get('/blogs',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Code-Blog");
        dbo.collection("Blogs").find({}).toArray((err,result)=>{
            if (err) throw err;
            db.close()
            res.render('blogs',{result:result})
        })
      });
})
router.get('/blogs/:slug',(req, res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Code-Blog");
        dbo.collection("Blogs").find({}).toArray((err,result)=>{
            if (err) throw err;
            const displayblog=result.filter((e)=>{
                return e.Blog_Title==req.params.slug
            })
            res.render("blogpage",{result:displayblog[0]})
        })
      });
})
router.get('/newblog',(req, res)=>{
    res.render("writeblog")
})
router.post('/createblog',(req, res)=>{
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        btitle=req.body.btitle
        bimg=req.body.bimg
        bdesc=req.body.bdesc
        const data={
            Blog_Title: btitle,
            Blog_Image: bimg,
            Blog_Description:bdesc
        }
        dbo=db.db("Code-Blog")
        dbo.collection('Blogs').insertOne(data,(err,result)=>{
            if(err) throw err;
            res.end("Blog submitted succesfully")
        })
})
})
module.exports =router