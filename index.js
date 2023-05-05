const express=require('express');
const app=express();
const mongoose=require('mongoose');
const OfferRouter=require('./router/router.offer');
const DataRouter=require('./router/router.Data');
// const UserRouter=require('./router/router.user');
const PlayerRouter=require('./router/router.players');

mongoose.connect("mongodb+srv://jaykishanchaudhary678:KF5XB3Zpg8MfjhUf@cluster0.1xz755a.mongodb.net/Live_Ops_Engine",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    throw err
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',OfferRouter);
app.use('/',DataRouter);
// app.use('/',UserRouter);
app.use('/',PlayerRouter);
app.listen(5000,()=>{
    console.log('port is listening on 5000')
})