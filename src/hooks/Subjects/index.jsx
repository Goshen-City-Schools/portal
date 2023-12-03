// useSubjects.js
import { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";

const useSubjects = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/subjects"); // Update with your API endpoint
        setSubjectsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedSubjects = useMemo(() => subjectsData, [subjectsData]);

  return { subjectsData: memoizedSubjects, loading, setSubjectsData };
};

const useSubject = (subjectId) => {
  const [subjectData, setSubjectData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(`/api/v1/subjects/${subjectId}`);
        setSubjectData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subject:", error.message);
        setLoading(false);
      }
    };

    fetchSubjectData(); // Call the async function
  }, [subjectId]); // Include staffId in the dependency array

  const memoizedSubject = useMemo(() => subjectData, [subjectData]);

  return { subjectData: memoizedSubject, loading, setSubjectData };
};

export { useSubjects, useSubject };
