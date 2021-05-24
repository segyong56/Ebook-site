const express = require('express');
const router = express.Router();
const { User } = require('../models/User')
const { auth } = require("../middleware/auth");
const multer = require('multer');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/ErrorHandler')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imagefile/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.jpeg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png, jpeg is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });

})

exports.loginUser = (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
}

exports.authUser = (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
}

exports.logoutUser = (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });

}

exports.profileImgUpload = catchAsyncErrors(async (req, res, next) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

})

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    let user = await User.findById(req.body.userId)
    if(!user)
    return next(new ErrorHandler('user cannot be found', 404))

    user = await User.findByIdAndUpdate(req.body.userId, {
        $push : {
            profile: {
                profileImg : req.body.profileImg,
                userName : req.body.userName
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
        user
    })

})
// router.post('/image', (req, res) => {

//     

// })

// router.post('/', (req, res) => {

//     const profile = new Profile(req.body)

//     profile.save((err, profile) => {
//         if(err) return res.status(400).json({ success : false, err})

//         Book.updateMany({ "bookWriter" : req.body.userInfo }, 
//         { "profile" : profile._id })
//         .exec((err, books) => {
//             if(err) return res.status(400).json({ success : false,  err})
//             res.status(200).json({ success : true, books})
//         })
//     })

// })




// router.get("/auth", auth, (req, res) => {
//     
// });


// router.get("/logout", auth, (req, res) => {
//     User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
//         if (err) return res.json({ success: false, err });
//         return res.status(200).send({
//             success: true
//         });
//     });
// });

// router.get('/addToReadinglist', auth, (req, res) => {

//     User.findOneAndUpdate({ _id: req.user._id },
//         {
//             $push: {
//                 readinglist: {
//                     id: req.query.bookId
//                 }
//             }
//         },
//         { new: true },
//         (err, userInfo) => {
//             if (err) return res.json({ success: false, err });
//             res.status(200).json(userInfo.readinglist)
//         }
//     )
// })

// router.post('/myReading_list', (req, res) => {

//     User.findOne({ "_id": req.body.user },
//         (err, userInfo) => {
//             if (err) return res.status(400).send(err)
//             res.status(200).json({ success: true, userInfo })
//         }
//     )


// })


// router.post('/followerNumber', (req, res) => {

//     Follower.find({ userTo: req.body.userTo })
//         .exec((err, follower) => {
//             if (err) return res.status(400).json({ success: false, err })
//             res.status(200).json({ success: true, followerNumber: follower.length })
//         })

// })


// router.post('/following', (req, res) => {

//     Follower.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
//         .exec((err, following) => {
//             if (err) return res.status(400).send(err);

//             let result = false
//             if (following.length !== 0) {
//                 result = true
//             }
//             res.status(200).json({ success: true, following: result })
//         })
// })


// router.post('/unfollowing', (req, res) => {

//     Follower.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
//         .exec((err, doc) => {
//             if (err) return res.status(400).send(err);
//             res.status(200).json({ success: true, doc })
//         })
// })

// router.post('/start_following', (req, res) => {

//     const following = new Follower(req.body)

//     following.save((err, doc) => {
//         if (err) return res.status(400).send(err)
//         res.status(200).json({ success: true, doc })
//     })

// })

// router.post('/myfollowing', (req, res) => {

//     Follower.find({ 'userFrom': req.body.userFrom })
//         .populate('userTo')
//         .exec((err, followings) => {
//             if (err) return res.status(400).send(err)

//             let myfollowing = []
//             for(let i = 0; i < followings.length; i++) {
//                 myfollowing.push(followings[i].userTo._id)
//             }

//             Profile.find({'userInfo' : { $in : myfollowing}})
//             .exec((err, profile) => {
//                 if(err) return res.status(400).send(err)
//                 res.status(200).json({ success : true, profile})
//             })
//             console.log(myfollowing)
//         })

// })


// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { Profile } = require("../models/Profile");
// const { auth } = require("../middleware/auth");
// const { User } = require('../models/User');
// const { Book } = require('../models/Book');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'imagefile/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.jpg' || ext !== '.jpeg' || ext !== '.png') {
//             return cb(res.status(400).end('only jpg, png, jpeg is allowed'), false);
//         }
//         cb(null, true)
//     }
// })

// var upload = multer({ storage: storage }).single("file")

// router.post('/image', (req, res) => {

//     upload(req, res, err => {
//         if (err) {
//             return res.json({ success: false, err })
//         }
//         return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
//     })

// })

// router.post('/', (req, res) => {

//     const profile = new Profile(req.body)

//     profile.save((err, profile) => {
//         if(err) return res.status(400).json({ success : false, err})

//         Book.updateMany({ "bookWriter" : req.body.userInfo }, 
//         { "profile" : profile._id })
//         .exec((err, books) => {
//             if(err) return res.status(400).json({ success : false,  err})
//             res.status(200).json({ success : true, books})
//         })
//     })

// })

// router.post('/userpage' , (req, res) => {

//     Profile.findOne({ "userInfo" : req.body.user })
//     .exec((err, profile) => {
//         if(err) return res.status(400).json({ success : false, err})
//         res.status(200).json({ success : true, profile})
//     })

// })

// router.post('/edit_profil', (req, res) => {

//     Profile.findOneAndUpdate(
//     { "userInfo" : req.body.userInfo}, 
//     {
//         "nickname" : req.body.nickname,
//         "imageUrl" : req.body.imageUrl
//     }, 
//     { new : true}
//     ).exec((err, result) => {
//         if(err) return res.status(400).json({ success : false, err})
//         res.status(200).json({ success : true, result})
//     })

// })

// module.exports = router;