const { Schema, model } = require('mongoose');

let housingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Apartament', 'Villa', ' House'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availablePieces: {
        type: Number,
        required: true,
    },

});

let Housing = model('Housing', housingSchema);
module.exports = Housing;