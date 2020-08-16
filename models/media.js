const Sequelise = require("sequelize")
const db = require ("../database/db.js")
const Post = require("./Post")

const Media = db.sequelize.define(
    "media",
    {
        id: {
            type: Sequelise.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelise.TEXT
        },
        path: {
            type: Sequelise.TEXT
        },
        type: {
           type: Sequelise.TEXT 
        }
    },
    {
        timestamps: false
    }
)

module.exports = Media
