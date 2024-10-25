// src/components/StudentTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/students');
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleDelete = async (rollNo) => {
    try {
      await axios.delete(`http://localhost:5001/api/students/${rollNo}`);
      setStudents(students.filter(student => student.rollNo !== rollNo));
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const handleEdit = (student) => {
    setEditMode(student.rollNo);
    setEditData(student);
  };

  const handleUpdate = async (rollNo) => {
    try {
      await axios.put(`http://localhost:5001/api/students/${rollNo}`, editData);
      setEditMode(null);
      fetchStudents();
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.tableContainer}>
      <h2 style={styles.heading}>Student Records</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Last Name</th>
              <th style={styles.th}>Roll No</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.rollNo}>
                <td style={styles.td}>
                  {editMode === student.rollNo ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleChange}
                      style={styles.editInput}
                    />
                  ) : student.firstName}
                </td>
                <td style={styles.td}>
                  {editMode === student.rollNo ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleChange}
                      style={styles.editInput}
                    />
                  ) : student.lastName}
                </td>
                <td style={styles.td}>{student.rollNo}</td>
                <td style={styles.td}>
                  {editMode === student.rollNo ? (
                    <input
                      type="text"
                      name="contactNumber"
                      value={editData.contactNumber}
                      onChange={handleChange}
                      style={styles.editInput}
                    />
                  ) : student.contactNumber}
                </td>
                <td style={styles.td}>
                  {editMode === student.rollNo ? (
                    <button
                      onClick={() => handleUpdate(student.rollNo)}
                      style={styles.saveButton}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(student)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(student.rollNo)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;