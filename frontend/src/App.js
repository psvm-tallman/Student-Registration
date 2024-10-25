// src/App.js
import React from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <StudentForm onStudentAdded={() => window.location.reload()} />
      <StudentTable />
    </div>
  );
}

export default App;