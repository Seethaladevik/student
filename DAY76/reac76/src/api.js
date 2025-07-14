const API_BASE = import.meta.env.VITE_API_URL;

// Example: Fetch all students
export const getStudents = async () => {
  const res = await fetch(`${API_BASE}/api/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

// Example: Login
export const loginUser = async (userData) => {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};
