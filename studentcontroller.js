const Student = require("../models/student");

// Get All Students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Student
const addStudent = async (req, res) => {
    try {
        const {
            usn,
            studentName,
            department,
            semester,
            section,
            academicYear,
            email,
            phone
        } = req.body;

        const exists = await Student.findOne({ usn });

        if (exists) {
            return res.status(400).json({
                message: "USN already exists"
            });
        }

        const student = await Student.create({
            usn,
            studentName,
            department,
            semester,
            section,
            academicYear,
            email,
            phone
        });

        res.status(201).json(student);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Student
const updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Student
const deleteStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
};