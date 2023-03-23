const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting all 
// GET http://localhost:3000/v1/users/
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
// GET http://localhost:3000/v1/users/<id>
router.get('/:id', getUser, (req, res) => {
    res.send(res.user)
})

// Verify User
// POST http://localhost:3000/v1/users/verify
router.post('/verify', verifyuser, (req, res) => {
    res.send(res.user)
})

// Creating one
// POST http://localhost:3000/v1/users/
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        fiscal_code: req.body.fiscal_code
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
// PATCH http://localhost:3000/v1/users/<id>
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.address != null) {
        res.user.address = req.body.address
    }
    if (req.body.fiscal_code != null) {
        res.user.fiscal_code = req.body.fiscal_code
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
// DELETE http://localhost:3000/v1/users/<id>
router.delete('/:id', getUser, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware functions
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

async function verifyuser(req, res, next) {
    if( (req.body.email != null) && (req.body.password != null) ) {
        const email = req.body.email
        const password = req.body.password
        
        let user
        
        try {
            user = await User.findOne({ email: email, password: password }).exec();
            if (!user) {
                return res.status(404).json({ message: 'false' })
            }
        } catch (err) {
            return res.status(505).json({ message: err.message })
        }

        return res.status(200).json({ message: 'true' })
        next()
    } else {
        if (req.body.email == null) {
            return res.status(400).json({ message: 'you must provide an email' })
        }        
        if (req.body.password == null) {
            return res.status(400).json({ message: 'you must provide an password' })
        }
    }
}

module.exports = router