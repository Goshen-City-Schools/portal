// useStudents.js
import { useEffect, useState, useMemo } from "react";
import axios from "../api/axios";
// import axios from "axios";

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

  // Memoize the value to prevent unnecessary re-renders
  const memoizedStudents = useMemo(() => studentsData, [studentsData]);

  return { studentsData: memoizedStudents, loading, setStudentsData };
};

export default useStudents;
