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
    /*dynamic_fields: [{
        type: Schema.Types.ObjectId, ref: 'Dynamic Field'
    }],
    sections: [{
        type: Schema.Types.ObjectId, ref: 'Section'
    }]*/
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
        /*field_type: { type: Schema.Types.ObjectId, ref: 'Field Type' }*/
        field_type: [{
            name: {
                type: String,
                required: true
            },
            options: [{
                type: String,
                required: true
            }]
        }]
    }]
})

module.exports = mongoose.model('Form', formSchema)