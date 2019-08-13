const express = require('express'),
router = express.Router(),
User = require('../../database/models/').user,
query_builder = require('../../database/query_builder'),
bcrypt = require('bcryptjs'),
gravatar = require('gravatar'),
jwt = require('jsonwebtoken');

router.get('/test',(req,res)=>{
    res.status(200).send({data : 'we are good'});
});

//*****************REGISTER USER********************** */
router.post('/register',(req,res)=>{
    User.findOne({
        where :  { email : req.body.email }
    }).then((user)=>{
        if(user){
            res.status(400).send({message : 'sorry this email has been used' , result : user.email});
        }else{
            let avatar = gravatar.url(req.body.email , {s :'200', r : 'pg' , d :'mm'});
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    if(err) throw err;
                    User.create({
                        firstname : req.body.firstname,
                        lastname  : req.body.lastname,
                        email     : req.body.email,
                        password : hash,
                        avatar : avatar
                    }).then((result)=>{
                        res.status(400).send({message : 'salt' , result : result});
                    }).catch((err)=>{
                        res.status(400).send({message : 'we have not create the user' , error : err});
                    })
                });
            });
        }
    }).catch((err)=>{
        console.log(err);
        res.status(400).send({message : 'sorry we have un internal server error'});
    })
});



//*****************LOGIN USER***********************/

const checkAuth = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(400).send({message : 'sorry you are not authorized'});
    }else{
        const verifiedUser = jwt.verify(token , 'secret-key');
        req.user = verifiedUser ;
        next();
    }
}

router.get('/login',(req,res)=>{
    User.findOne({
        where : { email : req.body.email }
    }).then((user)=>{
        if(user){
            bcrypt.compare(req.body.password , user.password , (err,isMatched)=>{
                if(isMatched){
                    jwt.sign({id : user.id , firstname : user.firstname , email : user.email},'secret-key',{expiresIn: '1h'} , (err,token)=>{
                        if(err) throw err;
                        res.header('auth-token' , token);
                        res.status(200).send({message : 'you have been Logged in' , matched: isMatched });
                    });
                }else{
                    res.status(400).send({message : 'sorry the password did not match' ,result : err});
                }
            })
        }else{
            res.status(404).send({message : 'we have not found any user'});
        }
    }).catch((err)=>{
        res.status(400).send({message : 'sorry we have un internal server error'});
    });
});

router.get('/findUser' , checkAuth , (req,res)=>{
        res.status(200).send({message : 'we are auth', user : req.user});
});



module.exports = router;