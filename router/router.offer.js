const router=require('express').Router();
const OfferModel=require('../Models/Offer.model');
const JwtAuth=require('../AuthMiddleWare/AuthMiddleWare');
const PlayerModel=require('../Models/Players.model');
const stringTemplate = require('string-template');

const jwt=require('jsonwebtoken');
 

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


// fetch offerconst offerFetchCtrl = async (req, res) =>
//  {    
//     const { age, installed_days } = req.body    
//     const validOffers = []    
//     try {        
//         const offer = await Offer.find({})        
//         offer.filter((offer) => 
//              {const rules = offer.target.split("and")            
//         //['age > 25', 'installed_days < 5']            
//         rules.forEach((rule) => { 
//             let ruleKey = {}                
//             if (rule.includes(">")) 
//             {  
//                 ruleKey = { key: rule.trim().split(">")[0].trim(),
//                  value: parseInt(rule.trim().split(">")[1]),                    
//                 }                    
//                 if (req.body[ruleKey] > ruleKey.value) {
//                     validOffers.push(offer)                    
//                 } 
//             }else{
//                 ruleKey = { key: rule.trim().split("<")[0].trim(),
//                             value: parseInt(rule.trim().split("<")[1]),     
//                            }                    
//                            validOffers.push(offer)                
//                 }    })        })  
//                       res.status(200).json({         
//                            status: 'Success',         
//                            data: validOffers,     
//                          }) }
//                           catch (error) 
//                           {    res.status(400).json(error.message)    }}

function CheckEligibility(){

}



router.get('/getOffer',JwtAuth,async(req,res)=>{
    // const {offer_id,offer_title,offer_description,offer_image,offer_sort_order,content,schedule,target,pricing}=req.params;
//     page = Page number 
// records = Number of records per page 
// attribute = Offer field to search 
// query
try{
const {page,records,attribute,query}=req.query;
const jesonWToken=req.headers['token'];
// console.log(jesonWToken,"hi");
const decoded=jwt.verify(jesonWToken,'JayPass');
const installed_days=decoded.installed_days;
const age=decoded.age;
console.log(installed_days,age);
const CurrentPage=parseInt(page)||1;
const PageSize=parseInt(records);
const skip=(CurrentPage-1)*PageSize
console.log(page,records,attribute,query);
// const targetQuery = stringTemplate(OfferModel.target, { age, installed_days });
// const OfferData = await OfferModel
//   .find({ [attribute]: { $regex: query, $options: 'i' } })
// //   .where(targetQuery)
//   .skip(skip)
//   .limit(PageSize);
const OfferData=await OfferModel.find({})
console.log(OfferData.length)
let finaloffer=[];
OfferData.filter((offer)=>{
    const Rules=offer.target.split("and");
    console.log(Rules);
    const Rule1=Rules[0].split("=");
    const Rule2=Rules[1].split("<");
    console.log(Rule1[1],Rule2[1]);
    if(age<=parseInt(Rule1[1])&& installed_days<parseInt(Rule2[1])){
        finaloffer.push(offer);
    }
})

// const OfferDataLength=await OfferModel.countDocuments({[attribute]:{$regex:query,$options:"i"}})

const totalPage=Math.ceil(finaloffer.length/PageSize)
res.status(200).json({
    result:finaloffer,
    totalPage:totalPage
})
}catch(err){
    console.log(err.message)
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