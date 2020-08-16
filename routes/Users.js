const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
//const auth = require('../middleware/auth');
const Post = require("../models/Post");
users.use(cors())

process.env.SECRET_KEY = 'secret'

//GET LIST OF ALL USERS
users.get("/list", (req, res) => {
    User.findAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send("error" + err)
        })
})

//GET ONE USER
users.get('/details/:id', (req, res) => {
    User.findOne({
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

//Update ONE USER
users.put('/update/:id', (req, res) => {
  

    //old password = req.body.old passord 
    // new passord = req.body.new passord
    
    // if (old = new) {
        // req.body.password = new passord 
    //}
    

    const userTO = req.body
    User.findOne({
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


//REGISTER
users.post('/register',  (req, res) => {
    const today = new Date()
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role_id: req.body.role_id,
        created_at: today,
        updated_at: today
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status:'ok','mesage':'Registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//LOGIN
users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send({token:token,id:user.id})
                }
            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

//DELETE ONE USER
users.delete('/:userId', async (req,res)=>{
const id = req.params.userId

let posts = await Post.findAll({
    where :{
        user_id: id
    }
})
const ids = posts.map(elem=>elem.id)

await Post.destroy({
    where: {
        id: ids
    }
});

User.destroy({
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
