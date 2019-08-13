// router.get('/login',(req,res)=>{
//     User.findOne({
//         where : { email : req.body.email }
//     }).then((user)=>{
//         if(user){
//             bcrypt.compare(req.body.password , user.password , (err,result)=>{
//                 if(err) throw err;
//                 res.status(200).send({message : 'the password is matched', result : result});
//             })
//         }else{
//             res.status(400).send({message : 'you does not have un account'});
//         }
//     }).catch((err)=>{
//         console.log(err);
//         res.status(400).send({message : 'sorry we have un internal server error'});
//     })
// });