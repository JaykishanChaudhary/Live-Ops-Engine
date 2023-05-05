const router=require('express').Router();
const PlayerModel=require('../Models/Players.model');
const bcrypt=require('bcrypt');
const JwtWebToken=require('jsonwebtoken');

// {
    //     "player_id": "<GUID>",
    //     "age": 35,
    //     "country": "IN", 
    //     "installed_days": 10, 
    //     "coins": 10000, 
    //     "gems": 2, 
    //     "game_level": 10, 
    //     "purchaser": false
    //     } 

router.post("/signup",async(req,res)=>{
    try{
        const {password,age,country,installed_days,coins,gems,game_level,purchaser}=req.body;
        console.log(password,age,country,installed_days,coins,gems,game_level,purchaser)
        const NewPlayer=await PlayerModel.create({
            password,
            age,
            country,
            installed_days,
            coins,
            gems,
            game_level,
            purchaser
        });
        res.status(200).json({
            status:'success',
            result:NewPlayer
        })
    }catch(err){
        throw err
    }
   
})


router.post('/login',async(req,res)=>{
    try{
        const {player_id,password}=req.body
        console.log(player_id,password,1)
        const FindUser=await PlayerModel.findOne({player_id});
        console.log(FindUser,1)
        if(FindUser){
          const PasswordCompare=await bcrypt.compare(password,FindUser.password);
          if(PasswordCompare){
            const installed_days=FindUser.installed_days;
            const age=FindUser.age;
            const PlayerData={installed_days:installed_days,age:age};
            const JWToken=JwtWebToken.sign(PlayerData,"JayPass");
            res.status(200).json({
                status:'success',
                result:JWToken
            })
          }else{
            res.status(401).json({
                status:'failed',
                result:'Password does not match'
            })
          }
        }else{
            res.status(404).json({
                status:'failed',
                result:'This username or password does not exist'
            })
        }
    }catch(err){
        throw err
    }
})


module.exports=router;

