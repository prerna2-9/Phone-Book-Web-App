const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Array,
        required: true,
    },
    email: {
        type: Array,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

let contacts = mongoose.model('Contacts', schema);

module.exports = contacts;