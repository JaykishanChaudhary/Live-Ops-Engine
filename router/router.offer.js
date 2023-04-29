const router=require('express').Router();
const OfferModel=require('../Models/Offer.model');


router.post('/Offer',async(req,res)=>{
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

router.get('/getOffer',async(req,res)=>{
    // const {offer_id,offer_title,offer_description,offer_image,offer_sort_order,content,schedule,target,pricing}=req.params;
//     page = Page number 
// records = Number of records per page 
// attribute = Offer field to search 
// query
try{
    const {page,records,attribute,query}=req.query;
console.log(page,records,attribute,query);
const OfferData=await OfferModel.find({[attribute]:query});
console.log(OfferData)

res.status(200).json({
    result:OfferData
})
}catch(err){
    console.log(err)
}


})




module.exports=router