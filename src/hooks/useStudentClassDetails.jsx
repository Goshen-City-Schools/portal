import { useState, useEffect, useMemo } from "react";
import axios from "../api/axios";

const useStudentClassDetails = (classId, subclassId) => {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        // Fetch class details
        const classResponse = await axios.get(
          `/api/v1/schoolClasses/${classId}`
        );
        setClassDetails(classResponse.data);
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

  // Extract subclass details from classDetails
  const subclassDetails = useMemo(() => {
    if (classDetails && subclassId) {
      const foundSubclass = classDetails.subClasses.find(
        (subclass) => subclass._id === subclassId
      );
      return foundSubclass || null;
    }
    return null;
  }, [classDetails, subclassId]);

  return { classDetails: memoizedClassDetails, subclassDetails, loading };
};

export default useStudentClassDetails;
