const express = require('express')
const router = express.Router()
const signupTemplatecopy = require('../models/Signup_model')
const signupTemplatecopy2 = require('../models/Signup_model_customer')
const feedbackTemplatecopy = require('../models/feedback_model');


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const Customer = require('../models/Signup_model_customer');
const Professional = require('../models/Signup_model');
/*router.get('/cookie' , (req,res) => {
    res.setHeader('Set-Cookie','newUser=true')
    res.send('got the cookies')
})*/
router.get('/signupProfessional',async (req,res) => {

    let loginemail = req.query.loginEmail.toString()
    let  loginpassword=req.query.loginPassword.toString()


    signupTemplatecopy.findOne({
        'email': loginemail
    }
    ).exec((err,user) =>{
        if (err) {
            console.log('error getting users');
        }else{
            if (!user) {
                console.log("user dosent exist!!");
                res.send('-2')
            }else(bcrypt.compare(loginpassword,user.password,(error,response) => {
                if (error) {
                    console.log(error);

                }else{
                    if (response) {
                        console.log('login successfull');
                        var id = user._id
                        var type = "professional"
                        var a={
                            id : id,
                            type : "professional"
                        }
                        var token = jwt.sign({id:id,type:"professional",role:user.occupation,place : user.location},process.env.JWT,{expiresIn:24*60*60})
                        res.send(token);

                    }else{

                        console.log("wrong password!!");
                        res.send('-1')


                    }

            }}))



        }
    })


})

// router.get('/customers',function(req,res){
//     console.log('Get request for customer details');
//     Customer.find({})
//     .exec(function(err,customers){
//         if(err){
//             console.log('Error retrieving customer details');
//         }
//         else{
//             res.json(customers);
//         }
//     });
// });

// router.get('/customers:id',function(req,res){
//     console.log('Get request for customer details');
//     Customer.find({})
//     .exec(function(err,customers){
//         if(err){
//             console.log('Error retrieving customer details');
//         }
//         else{
//             res.json(customers);
//         }
//     });
// });



router.post('/updateProfile', function(req, res, next){
    Customer.findById(req.body.id, function (err, user) {
        var email = req.body.email;
        var phoneno = req.body.phoneno;
        var name = req.body.name;
        console.log(req);

        user.email = email;
        user.phoneNo = phoneno;
        user.fullName = name; 
        

        // don't forget to save!
        user.save();
    });
});

router.post('/updateProfile_prof', function(req, res, next){
    Professional.findById(req.body.id, function (err, user) {
        var email = req.body.email;
        var phoneno = req.body.phoneno;
        var name = req.body.name;
        var location = req.body.location;
        var occupation = req.body.occupation;
        var experience = req.body.experience;

        console.log(req);

        user.email = email;
        user.phoneNo = phoneno;
        user.fullName = name; 
        user.location = location;
        user.occupation = occupation;
        user.experience = experience;
        

        // don't forget to save!
        user.save();
    });
});

router.get('/signupCustomer',async (req,res) => {
    console.log(req.query.loginEmail);
    let loginemail = req.query.loginEmail.toString()
    let  loginpassword=req.query.loginPassword.toString()
    signupTemplatecopy2.findOne({
        'email': loginemail
    }
    ).exec((err,user) =>{
        if (err) {
            console.log('error getting users');
        }else{
            if (!user) {
                console.log("user dosent exist!!");
                res.send('-2')
            }else(bcrypt.compare(loginpassword,user.password,(error,response) => {
                if (error) {
                    console.log(error);

                }else{
                    if (response) {
                        console.log('login successfull');
                        var id = user._id
                        var type = "customer"
                        var a={
                            id : id,
                            type : "customer",
                            name : user.fullName,
                            phNo :user.phoneNo,
                            email: user.email
                        }        
                        var token = jwt.sign({id:id,type:"customer",name : user.fullName,
                        phNo :user.phoneNo,
                        email: user.email},process.env.JWT,{expiresIn:24*60*60})             
                        res.send(token); 
                    }else{
                        console.log('wrong password!!');
                        res.send('-1')
                    }

            }}))



        }
    })



})

router.post('/signupProfessional',async (request,response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securedPassword = await bcrypt.hash(request.body.password,saltPassword)

    const signedupUser = new signupTemplatecopy({
        fullName:request.body.fullName,
        email:request.body.email,
        phoneNo:request.body.phoneNo,
        gender:request.body.gender,
        occupation:request.body.occupation,
        location:request.body.location,
        password:securedPassword,
        experience:request.body.experience,
    })
    signedupUser.save()
    .then(data => {
        return response.status(200).json(data)
       // response.send('ok')
    })
    .catch(error => {

        return response.status(404).json(error)

    })
})
router.post('/signupCustomer',async (request,response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securedPassword = await bcrypt.hash(request.body.password,saltPassword)

    const signedupUser = new signupTemplatecopy2({
        fullName:request.body.fullName,
        email:request.body.email,
        phoneNo:request.body.phoneNo,
        gender:request.body.gender,

        password:securedPassword

    })
    signedupUser.save()
    .then(data => {
        return response.status(200).json(data)
        //return response.send('ok')
    })
    .catch(error => {
        return response.status(404).json(error)

    })
})

router.post('/feedback',(req,res) => {
    const customer_id = req.body.c_id;
    const professional_id = req.body.p_id;
    console.log("professional id " + professional_id);
    const rating = req.body.rating;
    const review = req.body.review;
    const feedback = new feedbackTemplatecopy({
        rating:rating,
        review:review,
        customer_id:customer_id,
        professional_id:professional_id
    })
    feedback.save()
    .then(data => {
        console.log("feedback uploaded");
        return res.status(200).json(data);

    })
    .catch(error => {
        console.log("error in feedback uploading" + error);
        return res.status(404).json(error);
    })
})
router.post('/get_feedback_prof',(req,res)=>{
    const pID = req.body.prof.p_id;
    //console.log("p_id is "+req.body.prof.p_id);
    feedbackTemplatecopy.find(
        {
            'professional_id':pID
        }
    ).exec((err,feedback) => {
        if (err) {
            console.log("error in reciving feedback");
            return res.status(404);
        }else{
            if(!feedback){
                console.log("no feedback yet");
                return res.status(201);
            }else
            {
                //console.log("feedbacks recived");
                //console.log("feedbacks are" + feedback + "...");
                return res.status(200).send(feedback);
            }
        }
    })
   /*  var sql_query="SELECT * FROM feedback_prof WHERE p_id='"+req.body.prof.p_id+"'";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error retrieving professor feedback "+err);
        }
        else{
            console.log("result is "+JSON.stringify(result));
            res.send(result);
        }
    }) */
})

router.post('/givenFeedback',(req,res) => {
    const customer_id = req.body.customer_id
    const profession_id = req.body.profession_id
    signupTemplatecopy.findOne({
        'customer_id' : customer_id,
        'profession_id' : profession_id
    }).exec((err,result) => {
        if (err) {
            console.log(err);
        } else {
            if (result) {
                return res.status(200).json(result);
            }
        }
    })
})



module.exports = router;