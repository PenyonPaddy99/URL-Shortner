// Schema for tracking full URLs, Shortened URLs and clicks in order to store in DataBase

// Setting up all packages and modules to be used
const mongoose = require('mongoose')
const shortId = require('shortid')

// Setting up Schema
const shortUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    }
})

// Exporting schema
module.exports = mongoose.model('ShortUrl', shortUrlSchema)