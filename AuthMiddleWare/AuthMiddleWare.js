const jwt=require('jsonwebtoken');

const JwtAuth=(req,res,next)=>{
    const token=req.headers['token'];
    console.log(token);
    jwt.verify(token,'JayPass',(err,decodedtoken)=>{
        if(err){
            console.log(err);
            console.log(decodedtoken);
            res.json({
                status:'failed',
                result:'authentication failed'
            })
        }else{
            next()
        }
    })
}

module.exports=JwtAuth;