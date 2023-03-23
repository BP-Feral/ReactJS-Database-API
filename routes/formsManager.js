const express = require('express')
const router = express.Router()
const Form = require('../models/form')

// Get One by title
// GET http://localhost:3000/v1/forms/get/byTitle
router.get('/byTitle', getFormByTitle, (req, res) => {
    res.send(res.form)
})

// midleware functions
async function getFormByTitle(req, res, next) {
    if(req.body.title != null) {
        const title = req.body.title
        let form
        
        try {
            form = await Form.findOne({ title: title }).exec();
            if (!form) {
                return res.status(404).json({ message: 'Cannot find a form with this title'})
            }
        } catch (err) {
            return res.status(505).json({ message: err.message })
        }

        res.form = form
        next()
    } else {
        return res.status(400).json({ message: 'you must provide a title'})
    }
}

module.exports = router