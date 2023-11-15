import { useState, useEffect, useMemo, useCallback } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../configs/api";
import { useToast } from "@chakra-ui/react";

const useClassOptions = () => {
  const [schoolClasses, setSchoolClasses] = useState([]);
  const toast = useToast();
  const fetchClassOptions = useCallback(() => {
    fetch(`${API_BASE_URL}${API_ENDPOINTS.CLASSES}`)
      .then((response) => response.json())
      .then((data) => {
        setSchoolClasses(data || []);
      })
      .catch((error) => {
        console.error("Error fetching class options:", error);
        toast({
          status: "error",
          title: "Error fetching class options",
          duration: 3000,
        });
      });
  }, [API_BASE_URL, API_ENDPOINTS.CLASSES, setSchoolClasses, toast]);

  useEffect(() => {
    fetchClassOptions();
  }, [fetchClassOptions]);

  // Memoize the schoolClasses to prevent unnecessary re-renders
  const memoizedSchoolClasses = useMemo(() => schoolClasses, [schoolClasses]);

  return {
    schoolClasses: memoizedSchoolClasses,
    fetchClassOptions,
  };
};

export default useClassOptions;
