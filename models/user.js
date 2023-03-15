const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fiscal_code: {
        type: Number,
        required: false,
        default: 0
    }

    /*  company: {
        type: String,
        enum: {
            values: ["apple", "samsung", "dell", "mi"],
            message: `{VALUE} is not supported`,
        },
    },
*/

})

module.exports = mongoose.model('User', userSchema)