const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const carSchema = new Schema({
    manufacturer: { type: String, required: [true, 'Manufacturer is required'] },
    model: { type: String, required: [true, 'Model is required'] },
    trim: { type: String, required: [true, 'Trim is required'] },
    year: { type: Number, required: [true, 'Year is required'] }
})
module.exports = mongoose.model('Car', carSchema);