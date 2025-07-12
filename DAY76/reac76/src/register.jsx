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
            const response = await fetch("http://127.0.0.1:8000/register", {
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
        <div className="header1">
            <div className="regist2">
                <div className="adjust">
                    <form onSubmit={handleSubmit}>
                        <div className="var3">
                            <div className="tran">
                                <div className="form">

                                    <div className="mail2">
                                        <input
                                            type="number"
                                            name="sid"
                                            placeholder="SID"
                                            className="mail"
                                            onChange={handleChange}
                                            value={formData.sid}
                                            required
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
                                            />
                                            {error.sem && <p style={{ color: "red" }}>{error.sem}</p>}
                                        </div>

                                        <div className="mail23">
                                            <input
                                                type="number"
                                                step="0.1"
                                                name="cgpa"
                                                placeholder="CGPA"
                                                className="mail"
                                                onChange={handleChange}
                                                value={formData.cgpa}
                                                required
                                            />
                                            {error.cgpa && <p style={{ color: "red" }}>{error.cgpa}</p>}
                                        </div>

                                        <div className="mail24">
                                            <button type="submit" className="button1">Register</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
