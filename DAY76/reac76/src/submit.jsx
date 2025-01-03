import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Submit = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


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
  

  return (
    <div>
      <h1>Student Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Search by any field"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div style={{ marginBottom: "20px" }}>
        <label>
          Filter by Department:
          <select value={selectedDepartment} onChange={(e) => handleFilterByDepartment(e.target.value)}>
            <option value="">All</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Filter by Semester:
          <select value={selectedSemester} onChange={(e) => handleFilterBySemester(e.target.value)}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={handleSortByCgpa} style={{ marginBottom: "20px" }}>
        Sort by CGPA ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>SID</th>
            <th>SNAME</th>
            <th>DEPARTMENT</th>
            <th>SEM</th>
            <th onClick={handleSortByCgpa} style={{ cursor: 'pointer' }}>
              CGPA {sortOrder === "asc" ? "↑" : "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.sid}</td>
                <td>{user.sname}</td>
                <td>{user.department}</td>
                <td>{user.sem}</td>
                <td>{user.cgpa}</td>
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
  );
};

export default Submit;