const mongoose = require('mongoose');

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1960,
        max: 2021,
    },
    city: {
        type: String,
        required: true,
        minlength: [4, 'The city should be at least 4 characters long']
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
    },
    availablePieces: {
        type: Number,
        required: true,
        min: 0,
        max: 15,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    tenants: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }]

}, { timestamps: true });

housingSchema.method('getTenants', function() {
    return this.tenants.map(x => x.name).join(', ');
});

let Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;