import { useState, useEffect, useMemo } from "react";
import axios from "../api/axios";

const useClassDetails = (classId) => {
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

export { useClassDetails, useClasses, useStudentClassDetails };
