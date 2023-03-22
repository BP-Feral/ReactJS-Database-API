const express = require('express')
const router = express.Router()

// Get One by Email
// GET http://localhost:3000/v1/users/get/byEmail
router.get('/byEmail', getUserByEmail, (req, res) => {
    res.send(res.user)
})

// functions
async function getUserByEmail(req, res, next) {
    const email = req.query.email;
    try {
        let user;
        if (email) {
            user = await User.find({ email: email });
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user with this email '})
            }
        } 
    } catch (err) {
        return res.status(505).json({ message: err.message })
    }

    res.user = user
    next()

}

module.exports = router