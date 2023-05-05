const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const PlayesSchema=new mongoose.Schema({

    player_id:{
        type:mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    country:{
        type:String
    },
    installed_days:{
        type:Number
    },
    coins:{
        type:Number
    },
    gems:{
        type:Number
    },
    game_level:{
        type:Number
    },
    purchaser:{
        type:Boolean
    }


})

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
    
PlayesSchema.pre('save',async function (next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

const PlayerModel=mongoose.model('Player',PlayesSchema);

module.exports=PlayerModel;