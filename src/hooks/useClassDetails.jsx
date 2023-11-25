import { useState, useEffect, useMemo } from "react";
import axios from "../api/axios";

const {
  useClassDetails,
} = (classId) => {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/schoolClasses/${classId}`); // Replace with your actual API endpoint
        setClassDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class details:", error.message);
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);

  const memoizedClassDetails = useMemo(() => classDetails, [classDetails]);

  return { classDetails: memoizedClassDetails, loading };
};

export default { useClassDetails };
