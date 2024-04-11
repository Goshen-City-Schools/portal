import { useState, useEffect, useMemo, useRef } from "react";
import axios from "../../api/axios";

/* Description: returns full details of a given classID */

function useClassDetails(classId) {
  const [classDetails, setClassDetails] = useState(classId);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    // Set isMounted to true when the component mounts
    isMounted.current = true;

    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/schoolClasses/${classId}`);
        // Check if the component is still mounted before updating state
        if (isMounted.current) {
          setClassDetails(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching class details:", error.message);
        // Check if the component is still mounted before updating state
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    if (classId) {
      fetchClassDetails();
    }

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [classId]);

  const memoizedClassDetails = useMemo(() => classDetails, [classDetails]);

  return { classDetails: memoizedClassDetails, loading };
}

/* Description: this returns all classes in the school */
function useClasses() {
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
}

/* Descrition: returns the full details and subClass details of a given student's class */
function useStudentClassDetails(classId, subclassId) {
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
}

export { useClassDetails, useClasses, useStudentClassDetails };
