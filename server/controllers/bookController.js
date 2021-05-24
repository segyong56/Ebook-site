
const multer = require('multer');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/ErrorHandler')
const { Book } = require("../models/Book");
const { User } = require('../models/User');


const { diskStorage } = require('multer');
//=================================
//             Book
//=================================

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.jpeg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//get a image
exports.getBookImg = catchAsyncErrors(async (req, res, next) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.status(200).json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

})


//create a book => /api/upload
exports.createBook = catchAsyncErrors(async (req, res, next) => {

    const book = await Book.create({
        bookWriter : req.body.bookWriter,
        bookTitle : req.body.bookTitle,
        bookDescription : req.body.bookDescription,
        bookCoverImage: req.body.bookCoverImage,
        category : req.body.category
    })

    res.status(200).json({
        success : true,
        book
    })

})


//get a single book => /api/book/:bookId
exports.getSingleBook = catchAsyncErrors(async (req, res, next) => {

    const book = await Book.findById(req.params.bookId)

    if(!book) 
    return next(new ErrorHandler('book cannot find', 404))

    res.status(200).json({
        success : true,
        book
    })

})

//get books => /api/books
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip)

    let findArgs = {};

    await Book.find(findArgs)
                .skip(skip)
                .limit(limit)
                .then(books => {
                    if(!books)
                    return next(new ErrorHandler('books cannot be found', 404))

                    res.status(200).json({
                        success : true,
                        books
                    })
                })

})

//update book => /api/book/edit/:bookId
exports.updateBook = catchAsyncErrors(async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book)
    return next(new ErrorHandler('book cannot be found', 404))

    book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'book is edited',
        book
    })
})

//delete book => /api/book/delete
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.params.bookId)
    if(!book) {
        return next(new ErrorHandler('book cannot be found', 404))
    }

    await book.remove()

    res.status(200).json({
        success : true,
        message: 'book is deleted'
    })
})


//update content => /api/book/:bookId/content/upload
exports.updateContent = catchAsyncErrors(async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)
    if(!book)
    return next(new ErrorHandler('book cannot be found', 404))

    book = await Book.findByIdAndUpdate(req.params.bookId, {
        $push : {
            bookContent : {
                chapter : req.params.bookId + '_' + req.body.chapter,
                bookId : req.params.bookId,
                contentTitle : req.body.contentTitle,
                content : req.body.content
            }
        }
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message : 'content is updated',
        book
    })

})

//get all contents => /api/book/:bookId/contents
exports.getAllContents = catchAsyncErrors(async (req, res, next) => {

    const book = await Book.findById(req.params.bookId)

    if(!book)
    return next(new ErrorHandler('book cannot be found', 404))

    const content = book.content
    res.status(200).json({
        success : true,
        content
    })
})

//get a single content => /api/book/:bookId/content/:chapter
exports.getSingleContent = catchAsyncErrors(async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book) 
    return next(new ErrorHandler('book cannot be found', 404))

    const content = book.bookContent.filter(content => content.chapter === req.params.chapter)

    res.status(200).json({
        success: true,
        content
    })
})

//edit content => /api/book/:bookId/content/edit/:chapter
exports.editContent = catchAsyncErrors(async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book) 
    return next(new ErrorHandler('book cannot be found', 404))

    const query = {"_id" : req.params.bookId, "bookContent.chapter" : req.params.chapter}
    const updateContent = {
        $set : {
            "bookContent.$.contentTitle" : req.body.contentTitle,
            "bookContent.$.content" : req.body.content
        }
    }

    book = await Book.findOneAndUpdate(query, updateContent, {
        new: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'content is edited',
        book
    })
})

//delete content => /api/book/:bookId/content/delete
exports.deleteContent = catchAsyncErrors(async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book)
    return next(new ErrorHandler('book cannot be found', 404))

    let content = book.bookContent.filter(content => content.chapter === req.body.chapter)
    book = await Book.findByIdAndUpdate(req.params.bookId, {
        $pull: {
            bookContent: content[0]
        }
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'content is deleted',
        book
    })
})

//search books => /api/search
exports.searchBooks = catchAsyncErrors(async (req, res, next) => {

    const searchTerm = req.body.searchTerm

    await Book.find({ $text: {$search: searchTerm}})
                            .populate('bookWriter')
                            .then(books => {
                                if(!books)
                                return next(new ErrorHandler('books cannot be found', 404))

                                res.status(200).json({
                                    success: true,
                                    books
                                })
                            })


})

//category page => /api/search/:categoryKey
exports.searchCategory = catchAsyncErrors(async (req, res, next) => {
    const categoryKey = parseInt(req.body.categoryKey)
    const term = req.body.searchTerm

    if (term) {
      await Book.find({ "category": categoryKey })
            .find({ $text: { $search: term } })
            .populate('profile')
            .then(books => {
                if(!books)
                return next(new ErrorHandler('books cannot be found', 404))
                
                res.status(200).json({
                    success: true,
                    books
                })
            })
    } else {
      await Book.find({ "category": categoryKey })
            .populate('profile')
            .then(books => {
                if(!books)
                return next(new ErrorHandler('books cannot be found', 404))

                res.status(200).json({
                    success: true,
                    books
                })
            })

    }
})

//create a review


//get reviews


//get a review


//delete my review
