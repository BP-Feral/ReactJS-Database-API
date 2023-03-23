const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Get One by Email
// GET http://localhost:3000/v1/users/get/byEmail
router.get('/byEmail', getUserByEmail, (req, res) => {
    res.send(res.user)
})

// Get One by Name
// GET http://localhost:3000/v1/users/get/byName
router.get('/byName', getUserByName, (req, res) => {
    res.send(res.user)
})

// Get One by Address
// GET http://localhost:3000/v1/users/get/byAddress
router.get('/byAddress', getUserByAddress, (req, res) => {
    res.send(res.user)
})

// midleware functions
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

async function getUserByName(req, res, next) {
    if(req.body.name != null) {
        const name = req.body.name
        let user
        
        try {
            user = await User.findOne({ name: name }).exec();
            if (!user) {
                return res.status(404).json({ message: 'Cannot find user with this name'})
            }
        } catch (err) {
            return res.status(505).json({ message: err.message })
        }

        res.user = user
        next()
    } else {
        return res.status(400).json({ message: 'you must provide a name'})
    }
}

async function getUserByAddress(req, res, next) {
    if(req.body.address != null) {
        const address = req.body.address
        let user
        
        try {
            user = await User.findOne({ address: address }).exec();
            if (!user) {
                return res.status(404).json({ message: 'Cannot find user with this address'})
            }
        } catch (err) {
            return res.status(505).json({ message: err.message })
        }

        res.user = user
        next()
    } else {
        return res.status(400).json({ message: 'you must provide a address'})
    }
}

module.exports = router