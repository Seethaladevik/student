import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Submit = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
   const navigate=useNavigate()


  const fetchUsersBySearch = async (query) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/search", {
        search: query,
      });
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users by search:", error);
    }
  };
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      fetchUsersBySearch(query); // Fetch users based on the search query
    } else {
      // If the search query is empty, reload the users without filtering
      setFilteredUsers([]);
    }
  };


  useEffect(() => {
    // Fetch initial user data
    axios
      .get("http://127.0.0.1:8000/detail")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch users");
        console.error(err);
      });
  }, []);

  const handleSortByCgpa = () => {
    const sortedData = [...filteredUsers].sort((a, b) =>
      sortOrder === "asc" ? a.cgpa - b.cgpa : b.cgpa - a.cgpa
    );
    setFilteredUsers(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterByDepartment = (department) => {
    setSelectedDepartment(department);

    if (!department) {
      setFilteredUsers(users); // Reset to all users if no department selected
      return;
    }

    axios
      .post("http://127.0.0.1:8000/department", { department })
      .then((response) => {
        setFilteredUsers(response.data || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to filter by department");
        console.error(err);
      });
  };

  const handleFilterBySemester = (semester) => {
    setSelectedSemester(semester);

    if (!semester) {
      setFilteredUsers(users); // Reset to all users if no semester selected
      return;
    }

    axios
      .post("http://127.0.0.1:8000/sem", { sem: semester })
      .then((response) => {
        setFilteredUsers(response.data || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to filter by semester");
        console.error(err);
      });
  };
  function goToRegister() {
    navigate('/register');
  }

  return (
    <div className='header4'>
      <div className='box'>
      <div className='login1'>
      <h1>Student Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <h2 style={{color:"white"}}>search<input
        type="text"
        className='mail'
        placeholder="Search by any field"
        value={searchQuery}
        onChange={handleSearchChange}
      /></h2>
      <div style={{ marginBottom: "20px", color:"white"}}>
        <label>
          Filter by Department:
          <select value={selectedDepartment} className='mail' onChange={(e) => handleFilterByDepartment(e.target.value)}>
            <option value="">All</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>
        </label>
        

        <label style={{ marginLeft: "20px" }}>
          Filter by Semester:
          <select value={selectedSemester} className='mail' onChange={(e) => handleFilterBySemester(e.target.value)}>
            {[0,1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </label>
      
       &nbsp;&nbsp;&nbsp;
      <button onClick={handleSortByCgpa}  className='mail' style={{ marginBottom: "20px", fontSize:"10px" ,marginTop:"1vh", marginLeft:"2vw"}}>
        Sort by CGPA ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <button onClick={goToRegister}  className='mail' style={{ marginBottom: "20px", fontSize:"10px", marginTop:"1vh", marginLeft:"2vw" }}>
        Add
      </button>
      </div>
      </div>
      <div className='scrool'>
      <table border="1" className="table">
        <thead>
          <tr  >
            <th className='th'>SID</th>
            <th className='th'>SNAME</th>
            <th className='th'>DEPARTMENT</th>
            <th className='th'>SEM</th>
            <th onClick={handleSortByCgpa} style={{ cursor: 'pointer' }} className='th'>
              CGPA {sortOrder === "asc" ? "↑" : "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td className='th'>{user.sid}</td>
                <td className='th'>{user.sname}</td>
                <td className='th'>{user.department}</td>
                <td className='th'>{user.sem}</td>
                <td className='th'>{user.cgpa}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Submit;