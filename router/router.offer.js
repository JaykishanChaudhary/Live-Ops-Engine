const router=require('express').Router();
const OfferModel=require('../Models/Offer.model');
const JwtAuth=require('../AuthMiddleWare/AuthMiddleWare')


router.post('/Offer',JwtAuth,async(req,res)=>{
    try{
        const Offer=new OfferModel(req.body);
        const NewOffer=await Offer.save();
        res.status(200).json({
            status:'success',
            result:NewOffer
        })
    }catch(err){
        console.log(err) 
        res.status(500).json({
            status:'failure',
            result:err
        })
    }
})

router.get('/getOffer',JwtAuth,async(req,res)=>{
    // const {offer_id,offer_title,offer_description,offer_image,offer_sort_order,content,schedule,target,pricing}=req.params;
//     page = Page number 
// records = Number of records per page 
// attribute = Offer field to search 
// query
try{
    const {page,records,attribute,query}=req.query;
console.log(page,records,attribute,query);
const OfferData=await OfferModel.find({[attribute]:{$regex:query,$options:"i"}});
console.log(OfferData)

res.status(200).json({
    result:OfferData
})
}catch(err){
    console.log(err)
}


})


router.put('/UpdateOffer/:offer_id',JwtAuth,async(req,res)=>{
    try{
        const {offer_id}=req.params;
        console.log(offer_id);
        const FindOffer=await OfferModel.findOne({offer_id});
        // console.log(FindOffer);

        if(FindOffer){
            const UpdatedOffer=await OfferModel.updateOne(FindOffer,req.body);
            console.log(UpdatedOffer);
            res.status(200).json({
                status:'success',
                result:UpdatedOffer
            })
        }else{
            res.status(400).json({
                stsatus:'failed',
                result:'this id does not exist'
            })
        }

    }catch(err){
        throw err.message
    }
})
  

router.delete('/DeleteOffer/:offer_id',JwtAuth,async(req,res)=>{
    try{
        const {offer_id}=req.params;
        const FindOffer=await OfferModel.findOne({offer_id});
        console.log(offer_id,FindOffer);
        if(FindOffer){
            await OfferModel.deleteOne({offer_id});
            res.status(200).json({
                status:'success',
                result:'Successfully Deleted'
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                result:'this id does not exist'
            })
        }
    }catch(err){
        throw err
    }
})

module.exports=router