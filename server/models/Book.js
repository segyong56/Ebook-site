const mongoose = require('mongoose');
const User = require('../models/User')
const Schema = mongoose.Schema

const bookSchema = mongoose.Schema({
    bookTitle: {
        type:String,
        maxlength:50
    },
    bookDescription: {
        type: String
    },
    bookWriter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: Number,
        default : 0
    },
    bookCoverImage : {
        type: String,
    },
    bookContent : {
        type: Array,
        default: []
    },
    bookReviews: {
        type: Array,
        default: []
    }
}, { timestamps: true })

bookSchema.index({
    bookTitle: "text"
}, {
    weights: {
        bookTitle: 1
    }
})


const Book = mongoose.model('Book', bookSchema);

module.exports = { Book }