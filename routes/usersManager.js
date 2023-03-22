const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Get One by Email
// GET http://localhost:3000/v1/users/get/byEmail
router.get('/byEmail', getUserByEmail, (req, res) => {
    res.send(res.user)
})

// functions
async function getUserByEmail(req, res, next) {
    if(req.body.email != null) {
        const email = req.body.email
        let user
        
        try {
            user = await User.findOne({ email: email }).exec();
            if (!user) {
                return res.status(404).json({ message: 'Cannot find user with this email'})
            }
        } catch (err) {
            return res.status(505).json({ message: err.message })
        }

        res.user = user
        next()
    } else {
        return res.status(400).json({ message: 'you must provide an email'})
    }
}

module.exports = router