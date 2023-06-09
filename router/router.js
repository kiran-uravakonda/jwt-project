var express=require('express')
var app=express();
var router=express.Router()
var control=require('../controller/controller.js')

router.get('/login',control.get_login)
router.get('/signup',control.get_signup)
router.post('/signup',control.post_signup)
router.post('/login',control.post_login)



module.exports=router;