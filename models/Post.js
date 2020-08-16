const Sequelise = require("sequelize")
const db = require ("../database/db.js")
const User = require("./User")
const Media = require ("./media")
const Comment = require("./Comment")

const Post = db.sequelize.define(
    "post",
    {
        id: {
            type: Sequelise.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelise.STRING
        },
        slug: {
            type: Sequelise.STRING
        },
        content: {
            type: Sequelise.TEXT
        },
        status: {
            type: Sequelise.INTEGER
        },
        user_id: {
            type: Sequelise.INTEGER
        },
        media_id: {
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
    },

)
User.hasMany(Post, {foreignKey: 'user_id'})
Post.belongsTo(User, {foreignKey: 'user_id'})
Post.belongsTo(Media, {foreignKey: 'media_id'})

module.exports = Post
