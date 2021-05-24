const express = require('express');
const router = express.Router();
const { 
    createBook,
    getBookImg,
    getSingleBook,
    getAllBooks,
    updateBook,
    deleteBook,

    updateContent,
    getAllContents,
    getSingleContent,
    editContent,
    deleteContent,

    searchBooks,
    searchCategory

} = require('../controllers/bookController')

router.route('/:bookId').get(getSingleBook)
router.route('/getBooks').post(getAllBooks)

router.route('/upload').post(createBook)
router.route('/uploadImage').post(getBookImg)
router.route('/edit/:bookId').put(updateBook)
router.route('/delete/:bookId').delete(deleteBook)

router.route('/contents').get(getAllContents)
router.route('/:bookId/content/:chapter').get(getSingleContent)

router.route('/:bookId/content/upload').put(updateContent)
router.route('/:bookId/content/edit/:chapter').put(editContent)
router.route('/:bookId/content/delete').put(deleteContent)

router.route('/search').post(searchBooks)
router.route('/search/:categoryKey').post(searchCategory)

module.exports = router;
