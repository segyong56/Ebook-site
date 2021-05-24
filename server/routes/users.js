const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth")
const {
    registerUser,
    loginUser,
    logoutUser,

    authUser,

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

router.route('/image').post(profileImgUpload)
router.route('/update_profile').put(updateProfile)
module.exports = router;
