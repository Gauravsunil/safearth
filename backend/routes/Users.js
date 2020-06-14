const express=require('express');
const users=express.Router();
const cors=require('cors');
const bcrypt=require('bcrypt');
const User=require('../models/User');
const Time=require('../models/Time');
users.use(cors());
process.env.SECRET_KEY='secret';

users.post('/register',(req,res)=>{
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        user_name:req.body.user_name,
        email:req.body.email,
        password:req.body.password,
    }

    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash
                User.create(userData)
                .then(user=>{
                    res.json({
                        status:user.email+' registered!'
                    })
                })
                .catch(err=>{
                    res.send('error'+err);
                })
            })
        }else{
            res.json({
                err:'USER ALREADY EXISTS!'
            })
        }
    })
    .catch(err=>{
        res.send('error '+err);
    })
})
//--------------------------------------------------LOgin--------------------------------------------
users.get('/login/:email/:password',(req,res)=>{
    console.log(req.params.email);
    User.findOne({
        email:req.params.email
    })
    .then(user=>{
        console.log("User  logged in is user"+user);
        if(user){
            bcrypt.compare(req.params.password,user.password,(err,result)=>{
                
                if(result==true){
                    res.json({
                        status:user.email+' registered!'
                    })
                
                }else{
                    res.json({err:'Wrong Credentials!'});
                }
        })
    
    }else{
        res.json({err:'Wrong Credentials!'});
    }
})
    })

//----------------------------------------------------Fetching user Name-------------------------------------

users.get('/fetch/:email',(req,res)=>{
    console.log(req.params.email);
    User.findOne({email:req.params.email})
    .then(user=>{
        console.log(user);
        if(user){
            res.json(user);
        }else{
            res.send('USER DOESNT EXISTS!!');
        }
    }).catch(err=>{
        res.send('error: '+err);
    })
})

users.get('/timelog/:user',(req,res,next)=>{
    Time.find({user:req.params.user})
    .then(time=>{
        res.json(time);
    })
    .catch(err=>{
        console.log(errr);
    })
})
//-----------------------------------------------------Saving time Log-----------------------------------------------
users.post('/timelog',(req,res)=>{
    console.log(req.body.user);
    const data={
        user:req.body.user,
        task:req.body.task,
        project:req.body.project,
        start:req.body.start,
        end:req.body.end,
        timer:req.body.timer
    }
    Time.create(data)
    .then(res=>{
        console.log("SUCCESSFULLY INSERTED!!");
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports=users