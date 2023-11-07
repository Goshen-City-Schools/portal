import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function useStaff({ staffId }) {
  const [staff, setStaff] = useState({});
  const { getItem } = useLocalStorage("staffData");

  // Memoize the getItem function
  const memoizedGetItem = useMemo(() => getItem(), []);

  useEffect(() => {
    // Use the memoized getItem function
    const existingStaffs = memoizedGetItem;
    setStaff(existingStaffs.find((staff) => staff.id == staffId));
  }, [staffId, memoizedGetItem]);

  return staff;
}
