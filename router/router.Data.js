const router=require('express').Router();
const DataModel=require('../Models/Data.model');


router.post('/data',async(req,res)=>{
    try{
        const {tasks,reminder,dueDate}=req.body;
        const NewData=await DataModel.create({
            tasks,
            reminder,
            dueDate
        })

        res.status(200).json({
            status:'success',
            result:NewData
        })
    }catch(err){
        throw err
    }
})

module.exports=router