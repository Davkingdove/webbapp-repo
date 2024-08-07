
    
        import React, { useState, useEffect } from 'react';
        import axios from 'axios';
        import Modal from './Modal';
        
        const Search = () => {
          const [students, setStudents] = useState([]);
          const [selectedPrograms, setSelectedPrograms] = useState([]);
          const [selectedUser, setSelectedUser] = useState(null);
          const programs = ['General Science',  'Home Economics', 'Bussiness', 'Visual Arts'];
        
          useEffect(() => {
            fetchStudents();}, [selectedPrograms]);
        
          const fetchStudents = () => {
            const params = selectedPrograms.length ? { programs: selectedPrograms.join(',') } : {};
            axios.get('http://localhost:3000/students', { params })
              .then(response => {
                setStudents(response.data);
              })
              .catch(error => {
                console.error('Error fetching students:', error);
              });
          };
        
          const handleCheckboxChange = (event) => {
            const program = event.target.name;
            setSelectedPrograms(prev => 
              event.target.checked ? [...prev, program] : prev.filter(p => p !== program)
            );
          };
        
          return (
            <div>
              <h1>Student List</h1>
              <div>
                {programs.map(program => (
                  <label key={program}>
                    <input
                      type="checkbox"
                      name={program}
                      checked={selectedPrograms.includes(program)}
                      onChange={handleCheckboxChange}
                    />
                    {program}
                  </label>
                ))}
              </div>
        <div className="results">
       <ol>
       
        {students.map((student) => (
         
            <div key={student.id} onClick={() => setSelectedUser(student)}>
              <li>
              {student.first_name} {student.last_name}
              - {student.program} - {student.year} - {student.dob} 
                  - {student.Previous_School} - {student.BECE_aggregrate} - {student.mothers_name} - {student.mothers_contact} - {student.fathers_name} - {student.program}
                  - {student.fathers_contact} 
                  </li>
            </div>
            
          )
        )}
        
        </ol>
      </div>

      {selectedUser && (
        <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};
  export default Search;
        