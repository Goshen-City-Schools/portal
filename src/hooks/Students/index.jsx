// useStudents.js
import { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";
import { getSingleStudent } from "../../api/student.api";

const useStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/students"); // Update with your API endpoint
        setStudentsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedStudents = useMemo(() => studentsData, [studentsData]);

  return { studentsData: memoizedStudents, loading, setStudentsData };
};

const useStudent = ({ studentId }) => {
  const [studentData, setStudentData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getSingleStudent(studentId);
        setStudentData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student:", error.message);
        setLoading(false);
      }
    };

    fetchStudentData(); // Call the async function
  }, [studentId]); // Include staffId in the dependency array

  const memoizedStudent = useMemo(() => studentData, [studentData]);

  return { studentData: memoizedStudent, loading, setStudentData };
};

export { useStudents, useStudent };
