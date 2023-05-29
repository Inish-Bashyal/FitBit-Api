const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



// Register user
exports.createUser = catchAsyncErrors(async(req, res, next) => {
    User.findOne({ username: req.body.username })
    .then((user) => {
        if (user) return res.status(400)
            .json({ error: 'User already registered' })

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: err.message })
            const user = {
                username: req.body.username,
                password: hash,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                gender: req.body.gender
            }
            User.create(user)
                .then((user) => res.status(201).json(user))
                .catch(next)
        })
    }).catch(next)
});

// user login
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const { username, password } = req.body
    User.findOne({ username })
        .then(user => {
            if (!user) return res
                .status(401)
                .json({ error: 'user is not registered' })

            bcrypt.compare(password, user.password, (err, success) => {
                if (err) return res
                    .status(500)
                    .json({ error: err.message })

                if (!success) return res
                    .status(401)
                    .json({ error: 'password does not match' })
                const payload = {
                    id: user._id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    age: user.age,
                    gender: user.gender,
                    role: user.role
                }

                jwt.sign(payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }, (err, encoded) => {
                        if (err) res.status(500).json({ error: err.message })
                        res.json({
                            username: user.username,
                            token: encoded
                        })
                    })
            })
        }).catch(next)
});

// logout user

exports.logoutUser = catchAsyncErrors(async(req, res, next) => {
    res.clearCookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "You are logged out successfully",
    });
});
