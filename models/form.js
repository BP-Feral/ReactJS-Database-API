const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const formSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    retention_date: {
        type: Date,
        required: true,
    },
    sections: [{
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        scan_type: {
            type: String,
            required: true
        },
        dynamic_fields: [{
            dynamic_field_name: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                required: true
            },
            mandatory: {
                type: Boolean,
                required: true
            },
            keywords: {
                type: [String],
                required: true
            },
            field_type: {
                name: {
                    type: String,
                    required: true
                },
                options: [{
                    type: String,
                    required: true
                }]
            }
        }]
    }]
})

module.exports = mongoose.model('Form', formSchema)