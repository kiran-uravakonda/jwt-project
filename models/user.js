var mongoose=require('mongoose')
var url='mongodb://localhost:27017/jwt-project'
const {isEmail}=require('validator')
var bcrypt=require('bcrypt')


mongoose.connect(url)
.then((value)=>{
  console.log("database connected successfully")
})
.catch((err)=>{
    console.log("database not connected")
})

var userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter a email"],
        unique:true,
        validate:[isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter a password"],
        unique:true,
        minLength:[5,"minimum password length is 5 characters"]
    }
})

userSchema.pre('save',async function(next){
    var salt=await bcrypt.genSalt()
    // console.log(salt)
    // console.log(this.password)
    this.password= await bcrypt.hash(this.password,salt)
    // console.log(this.password)
    next()
  })








// userSchema.post('save',()=>{
//     user.password===undefined
// })

// userSchema.post('save',(doc)=>{
//     console.log("after saving in db",doc)
// })
var user=new mongoose.model('userData',userSchema)
module.exports=user;