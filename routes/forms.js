const express = require('express')
const router = express.Router()
const Form = require('../models/form')

// Getting all 
// GET http://localhost:3000/v1/forms/
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find()
        res.json(forms)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
// GET http://localhost:3000/v1/forms/<id>
router.get('/:id', getForm, (req, res) => {
    res.send(res.form)
})

// Creating one
// POST http://localhost:3000/v1/forms/
router.post('/', async (req, res) => {
    const form = new Form(
        {
            title: req.body.title,
            retention_date: req.body.retention_date,
            dynamic_fields: req.body.dynamic_fields,
            sections: req.body.sections
        }
    )

    try {
    const newForm = await form.save()
    res.status(201).json(newForm)
    } catch (err) {
        if (err.name === 'CastError')
        res.json({ message: `Invalid ${err.path}: ${err.value} TEST`});
        else
        res.status(400).json({ message: err.message })
    }
})

// Updating one
// PATCH http://localhost:3000/v1/forms/<id>
router.patch('/:id', getForm, async (req, res) => {
    if (req.body.title != null) {
        res.form.title = req.body.title
    }
    if (req.body.retention_date != null) {
        res.form.retention_date = req.body.retention_date
    }
    if (req.body.dynamic_fields != null) {
        res.form.dynamic_fields = req.body.dynamic_fields
    }
    if (req.body.sections != null) {
        res.form.sections = req.body.sections
    }
    try {
        const updatedForm = await res.form.save()
        res.json(updatedForm)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
// DELETE http://localhost:3000/v1/forms/<id>
router.delete('/:id', getForm, async (req, res) => {
    try {
        await Form.deleteOne({ _id: res.form._id })
        res.json({ message: 'Deleted form' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getForm(req, res, next) {
    let form
    try {
        form = await Form.findById(req.params.id)
        if (form == null) {
            return res.status(404).json({ message: 'Cannot find form' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.form = form
    next()
}

module.exports = router