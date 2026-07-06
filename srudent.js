const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    usn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    studentName: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        required: true
    },

    section: {
        type: String,
        required: true
    },

    academicYear: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);