import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

const Register = () => {
    const navigate = useNavigate();            
    const fileInputRef = useRef(null);
    const imageRef = useRef(null);

    const [formData, setFormData] = useState({
        sid: "",
        name: "",
        department: "Aerospace Engineering",
        sem: "",
        cgpa: ""
    });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value: inputValue } = e.target;
        let value = inputValue;

        let newErrors = { ...error };

        if (name === "sid") {
            value = value.replace(/[^0-9]/g, "");
            newErrors.sid = value > 0 ? "" : "Enter a valid numeric ID";
        } else if (name === "name") {
            value = value.replace(/[^A-Za-z\s]/g, "");
            newErrors.name = /^[A-Za-z\s]+$/.test(value) ? "" : "Enter a valid name";
        } else if (name === "department") {
            newErrors.department = value ? "" : "Select a department";
        } else if (name === "sem") {
            newErrors.sem = value > 0 ? "" : "Enter a valid semester";
        } else if (name === "cgpa") {
            newErrors.cgpa = value > 0 ? "" : "Enter a valid CGPA";
        }

        setFormData({ ...formData, [name]: value });
        setError(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasErrors = Object.values(error).some((msg) => msg !== "");
        if (hasErrors) {
            Swal.fire("Error", "Please correct the highlighted errors", "error");
            return;
        }

        const payload = {
            sid: formData.sid ? Number(formData.sid) : null,
            name: formData.name,
            department: formData.department,
            sem: formData.sem ? Number(formData.sem) : null,
            cgpa: formData.cgpa ? Number(formData.cgpa) : null,
        };

        try {
            const response = await fetch("https://studentdatabase-6.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire("Success", data.message, "success");
                // navigate("/success"); // optional navigation
            } else {
                const errorText =
                    typeof data.detail === "string"
                        ? data.detail
                        : JSON.stringify(data.detail);
                Swal.fire("Error", errorText, "error");
            }
        } catch (error) {
            Swal.fire("Error", "Network error or server not responding", "error");
        }
    };

    return (
        <div className="header111">
            <div className="tran">
                <div className="login">
            <h1><u>Register</u></h1>
          </div>
                    <form onSubmit={handleSubmit}>
                        
                            
                                <div className="mail2">
                                        <input
                                            type="number"
                                            name="sid"
                                            placeholder="SID"
                                            className="mail"
                                            onChange={handleChange}
                                            value={formData.sid}
                                            required
                                            style={{backgroundColor:"rgba(253, 247, 255, 0.34)", color:"white"}}
                                        />
                                        {error.sid && <p style={{ color: "red" }}>{error.sid}</p>}
                                    </div>

                                    <div className="mail2">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            className="mail"
                                            onChange={handleChange}
                                            value={formData.name}
                                            required
                                            style={{backgroundColor:"rgba(253, 247, 255, 0.34)", color:"white"}}
                                        />
                                        {error.name && <p style={{ color: "red" }}>{error.name}</p>}
                                    </div>

                                   <div className="mail2">
                                        <select
                                            name="department"
                                            className="mail"
                                            onChange={handleChange}
                                            value={formData.department}
                                            required
                                            style={{backgroundColor:"rgba(151, 40, 179, 0.5)", color:"white"}}
                                        >
                                            <option value="Aerospace Engineering">Aerospace Engineering</option>
                                            <option value="Avionics">Avionics</option>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Earth and Space Sciences">Earth and Space Sciences</option>
                                            <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
                                            <option value="Mathematics">Mathematics</option>
                                            <option value="Physics">Physics</option>
                                        </select>
                                        {error.department && <p style={{ color: "red" }}>{error.department}</p>}
                                    
                                    </div>
                                    <div className="mail2">
                                        <div className="mail23">
                                            <input
                                                type="number"
                                                name="sem"
                                                placeholder="Semester"
                                                className="mail"
                                                onChange={handleChange}
                                                value={formData.sem}
                                                required
                                                style={{backgroundColor:"rgba(253, 247, 255, 0.34)", color:"white"}}
                                            />
                                            {error.sem && <p style={{ color: "red" }}>{error.sem}</p>}
                                        </div>

                                        <div className="mail123">
                                            <input
                                                type="number"
                                                step="0.1"
                                                name="cgpa"
                                                placeholder="CGPA"
                                                className="mail"
                                                onChange={handleChange}
                                                value={formData.cgpa}
                                                required
                                                style={{backgroundColor:"rgba(253, 247, 255, 0.34)", color:"white"}}
                                            />
                                            {error.cgpa && <p style={{ color: "red" }}>{error.cgpa}</p>}
                                        </div>

                                        
                                            <button type="submit" className="button101">Register</button>
                                        
                                    </div>

                               
                          
                        
                    </form>
                     </div> 
        </div> 
       
    );
};

export default Register;
