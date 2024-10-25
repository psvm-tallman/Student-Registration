// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

// Create student
router.post('/', async (req, res) => {
  try {
    const { password, ...studentData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const student = new Student({
      ...studentData,
      password: hashedPassword
    });
    
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update student
router.put('/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      { $set: req.body },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete student
router.delete('/:rollNo', async (req, res) => {
  try {
    await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
