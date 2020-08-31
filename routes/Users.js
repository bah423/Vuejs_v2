const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt")
var db = require('../models/index');
const authenticate = require("../authenticate");
users.use(cors())
/*var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    secure: false,
    port: 2525,
    auth: {
      user: "c593ca4a2647b7",
      pass: "ff11d87d1b4957"
    },
    tls: { rejectUnauthorized: false }
  });*/

//LIST USERS
//GET ALL USERS
users.get("/Users", authenticate.verifyUser,(req, res) => {
    db.user.findAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send("error" + err)
        })
})


//GET ONE USER
users.get('/Users/:id',authenticate.verifyUser,(req, res) => {
    db.user.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//UPDATE ONE USER
users.put('/update/:id',authenticate.verifyUser,(req, res) => {

 const userTO = req.body
    db.user.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function (user) {
      // Check if record exists in db
      if (user) {
        user.update(
            userTO
        )
        .then(function (data) {
            res.send(data)
        })
      }
    })
})


//UPDATE PASSWORD
users.put('/updatePassword/:id',authenticate.verifyUser, (req, res) => {

    const data = req.body
           db.user.findOne({
           where: {
               id: req.params.id
           }
       })
       .then(function (user) {
      // Check if record exists in db
         if (user) {    

           if( bcrypt.compareSync(data.password, user.password) ){
            if(data.newPassword == data.confirmPassword){
                 bcrypt.hash(data.newPassword, 10, (err,hash)=> {  
           user.update(
               {password : hash}
           ) 
           .then((data) =>{
               res.status(200).json(data)
           })
        } );
    
    } else {
        res.status(400).json({success: false , message: "verify your confirmation password"})
    }
        
}
        
        else {
            res.status(400).json({success: false , message: "verify your password"})

           
        }
         } else {
             res.status(400).json({success: false , message: "verify your password"})
         }
       })
   })


//REGISTER
users.post('/register',(req, res) => {
    const today = new Date()
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role_id: req.body.role_id,
        created_at: today,
        updated_at: today
    }
    db.user.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    db.user.create(userData)
                        .then(user => {
                            res.json({ status:'ok','mesage':'Registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.status(400).send({ error: 'User already exists' })
                return
            }
        })
        .catch(err => {
            res.send('error:: ' + err)
        })
})

//LOGIN
users.post('/login', (req, res) => {
    db.user.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let payload = { id: user.id };
                    let token = authenticate.getToken(payload)
                    res.status(200).json({token:token,id:user.id})
                }
            } else {
                res.json({ message:'NOK' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})


//DELETE ONE USER
users.delete('/:userId',authenticate.verifyUser, async (req,res)=>{
const id = req.params.userId

db.user.destroy({
    where: {
    id:id
    }
}).
then(result=> {console.log(result)
res.status(200).json({success: true , message:"User deleted"})
}
)
.catch ( error => {
     res.status(500).json({message:"error de suppression"}),
console.log(error)} 
)
}); 


module.exports = users
