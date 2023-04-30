const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema=new mongoose.Schema({
    username:String,
    password:String
})


// userSchema.pre('save',async function(next){
//     console.log('User is about to created and saved',this);
//     const salt= await bcrypt.genSalt();
//     this.password=await bcrypt.hash(this.password,salt); 
//     next();
// })
UserSchema.pre('save',async function (next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})


const UserModel=mongoose.model('user',UserSchema);

module.exports=UserModel