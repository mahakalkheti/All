// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    className: String,
    date: String, // e.g., "2025-06-16"
    students: [
        {
            roll: String,
            isPresent: Boolean
        }
    ]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
