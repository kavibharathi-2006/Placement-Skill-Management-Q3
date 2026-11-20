
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    department: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationSkills: "",
    placementReadiness: ""
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      ...form,
      technicalSkills: form.technicalSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
      aptitudeScore: Number(form.aptitudeScore)
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
      } else {
        await axios.post(API_URL, studentData);
      }

      setForm({
        name: "",
        department: "",
        technicalSkills: "",
        aptitudeScore: "",
        communicationSkills: "",
        placementReadiness: ""
      });

      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);

    setForm({
      name: student.name,
      department: student.department,
      technicalSkills: student.technicalSkills.join(", "),
      aptitudeScore: student.aptitudeScore,
      communicationSkills: student.communicationSkills,
      placementReadiness: student.placementReadiness
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h1>Placement Skill Management System</h1>

      <h2>{editingId ? "Update Student Skills" : "Add Student Skills"}</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Student Name" value={form.name} onChange={handleChange} required />

        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />

        <input name="technicalSkills" placeholder="Technical Skills (HTML, CSS, React)" value={form.technicalSkills} onChange={handleChange} required />

        <input name="aptitudeScore" type="number" placeholder="Aptitude Score" value={form.aptitudeScore} onChange={handleChange} required />

        <input name="communicationSkills" placeholder="Communication Skills" value={form.communicationSkills} onChange={handleChange} required />

        <input name="placementReadiness" placeholder="Placement Readiness Status" value={form.placementReadiness} onChange={handleChange} required />

        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h2>Student Skill List</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Department: {student.department}</p>
          <p>Technical Skills: {student.technicalSkills.join(", ")}</p>
          <p>Aptitude Score: {student.aptitudeScore}</p>
          <p>Communication Skills: {student.communicationSkills}</p>
          <p>Placement Readiness: {student.placementReadiness}</p>

          <button onClick={() => handleEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
