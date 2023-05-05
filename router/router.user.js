// const router=require('express').Router();
// const UserModel=require('../Models/User.model');
// const bcrypt=require('bcrypt');
// const JwtWebToken=require('jsonwebtoken');

// router.post('/signup',async(req,res)=>{
//     try{
//         const {username,password}=req.body;
//        const NewUser=await UserModel.create({
//         username,
//         password
//        })
//        res.status(200).json({
//         status:'success',
//         result:NewUser
//        })
//     }catch(err){

//     }
// })


// // router.post('/login',async(req,res)=>{
// //     try{
// //         const {username,password}=req.body
// //         const FindUser=await UserModel.findOne({username});
// //         console.log(FindUser);
// //         if(FindUser){
// //           const PasswordCompare=await bcrypt.compare(password,FindUser.password);
// //           if(PasswordCompare){
// //             const id=FindUser._id
// //             const JWToken=JwtWebToken.sign({id},"JayPass");
// //             res.status(200).json({
// //                 status:'success',
// //                 result:JWToken
// //             })
// //           }else{
// //             res.status(401).json({
// //                 status:'failed',
// //                 result:'Password does not match'
// //             })
// //           }
// //         }else{
// //             res.status(404).json({
// //                 status:'failed',
// //                 result:'This username or password does not exist'
// //             })
// //         }
// //     }catch(err){
// //         throw err
// //     }
// // })


// module.exports=router