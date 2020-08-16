const Sequelise = require("sequelize")
const db = require ("../database/db.js")
const Post = require("./Post")
const User = require("./User")
const Comment = db.sequelize.define(
    "comment",
    {
        id: {
            type: Sequelise.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelise.INTEGER
        },
        post_id: {
            type: Sequelise.INTEGER
        },
        contenu: {
            type: Sequelise.TEXT
        },
        status: {
            type: Sequelise.INTEGER
        },
        created_at: {
            type: Sequelise.DATE,
            defaultValue: Sequelise.NOW
        },
        updated_at: {
            type: Sequelise.DATE,
            defaultValue: Sequelise.NOW

        }
    },
    {
        timestamps: false
    }
)

Comment.belongsTo(User, {foreignKey: 'user_id'})
//Comment.belongsTo(Post, {foreignKey: 'post_id'})


module.exports = Comment