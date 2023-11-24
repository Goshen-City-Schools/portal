// useClasses.js (or useClasses.ts for TypeScript)

import { useState, useEffect, useMemo } from "react";
import axios from "../api/axios";

const useClasses = () => {
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get("/api/v1/schoolClasses"); // Replace with your API endpoint
        setSchoolClasses(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class data:", error.message);
        setLoading(false);
      }
    };

    fetchClassData();
  }, []);

  // Memoize the schoolClasses state
  const memoizedSchoolClasses = useMemo(() => schoolClasses, [schoolClasses]);

  return { schoolClasses: memoizedSchoolClasses, loading };
};

export default useClasses;
