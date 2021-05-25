const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth")
const {
    registerUser,
    loginUser,
    logoutUser,

    authUser,
    getUser,

    profileImgUpload,
    updateProfile
} = require('../controllers/authController')
//=================================
//             User
//=================================

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(auth, logoutUser)

router.route('/auth').get(auth, authUser)
router.route('/me/mypage').post(auth, getUser)

router.route('/image').post(auth, profileImgUpload)
router.route('/me/mypage/edit').put(auth, updateProfile)

module.exports = router;
