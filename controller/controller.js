var User=require('../models/user.js')
const bcrypt=require('bcrypt')
var cookieParser=require('cookie-parser')
var jwt=require('jsonwebtoken')
const handleErrors=(err)=>{
    console.log(err.message,err.code)
}
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret');
};

var get_login=(req,res)=>{
    res.render('login')
}

var get_signup=(req,res)=>{
    res.render('signup')
}

var post_signup = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      console.log(token)
      console.log(user._id)
    //   res.cookie('jwt', token, { httpOnly: true });
      res.status(201).json({ user: user._id });
    
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
   
  }
  

    // User.insertMany({name,password})
    // .then((result)=>{
    //     res.send(result)
    // })
    // .catch((err)=>{
    //     res.sendStatus(400)
    //     res.send("user not created")
        
    // })
    


var post_login=async (req,res)=>{
    // const { email, password } = req.body;
    var check=await User.findOne({email:req.body.email})
    console.log(check)
    
   if(check)
    {
        var data=await bcrypt.compare(req.body.password,check.password)
        if(data){
        // res.render('home')
        res.json(check._id)
        }
        else{ (res.json('incorrect password'));}
        
    }
    else{ (res.json('incorrect email'));}
    
}



module.exports={
    get_login,get_signup,post_signup,post_login
}