import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function useStudent({ studentId }) {
  const [student, setStudent] = useState({});
  const { getItem } = useLocalStorage("studentsData");

  // Memoize the getItem function
  const memoizedGetItem = useMemo(() => getItem(), []);

  useEffect(() => {
    // Use the memoized getItem function
    const existingStudents = memoizedGetItem;
    setStudent(existingStudents.find((student) => student.id == studentId));
  }, [studentId, memoizedGetItem]);

  return student;
}
