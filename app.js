var express=require('express')
var mongoose=require('mongoose')
var hbs=require('hbs')
var path=require('path')
var cookieParser=require('cookie-parser')
var viewsPath=path.join(__dirname,'views')

var app=express();
app.set('view engine','hbs')
// app.set('hbs',viewsPath)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

var router=require('./router/router.js')
app.use(router)
app.use(cookieParser())

// app.get('/',(req,res)=>{
   
//     res.cookie('hello','world')
//     res.cookie(`Nodejs`,'JavaScript',{maxAge:1000,expires:new Date('05 06 2023')})
//     res.cookie('kiran',22)  
//     res.send("welcome to cookie session")
// })

// app.get('/delete',(req,res)=>{
//    res.clearCookie()
//    res.send("cookie successfully deleted")
// })

// app.get('/get',(req,res)=>{
//     var cookies=req.cookies
//     console.log(cookies)
//     res.send(cookies.nodejs)
// })

app.listen(1000,()=>{
    console.log("server running on 1000 port")
})