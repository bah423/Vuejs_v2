const express = require("express")
const comments = express.Router()
const cors = require("cors")

var db = require('../models/index');

comments.use(cors())

// GET ALL COMMENTS
comments.get('/Comments', (req, res, next) => {

    db.comment.findAll({ where: {}, include: []})
        .then(comments => {
            res.json(comments)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// ADD COMMENT
comments.post('/add', (req, res, next) => {
    if (!req.body.userId || !req.body.postId || !req.body.contenu) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        const commentData = {
            userId: req.body.userId,
            postId: req.body.postId,
            contenu: req.body.contenu,
            status: 1
        }

        db.comment.create(commentData)
            .then(() => {
                res.send('COMMENT Added!')
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
})


// DELETE COMMENT
comments.delete('/:id', (req, res, next) => {
    db.comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send('Comment deleted!')
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// GET COMMENT BY PostId
comments.get('/byPost/:postId', (req, res, next) => {


    db.comment.findAll({
        where: {
            postId: req.params.postId
        }, include :[db.user]
    })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})
// GET COMMENT BY UserId
comments.get('/byUser/:userId', (req, res, next) => {
    db.comment.findAll({
        where: {
            userId: req.params.userId
        }
    })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})
//Detail comment
comments.get('/details/:id', (req, res, next) => {
    
    db.comment.findOne({
        where: {
            id: req.params.id
        },
        include: []
    })
        .then(comment => {
            res.json(comment)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// UPDATE COMMENT
comments.put('/:id', (req, res, next) => {

     newComment = req.body
    if (!req.body.contenu) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        db.comment.update(
            {contenu: req.body.contenu},
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send('comment Updated!')
            })
            .catch(err => handleError(err))
    
}
})





module.exports = comments
