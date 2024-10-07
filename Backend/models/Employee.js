const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: [String] },
    imgUpload: { type: String }, // Store the file path as a string
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', employeeSchema);
