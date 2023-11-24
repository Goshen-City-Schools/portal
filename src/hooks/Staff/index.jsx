// useStaffs.js
import { useEffect, useState, useMemo } from "react";
import axios from "../api/axios";
// import axios from "axios";

const useStaffs = () => {
  const [staffsData, setStaffsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/staff"); // Update with your API endpoint
        setStaffsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staffs:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const memoizedStaffs = useMemo(() => staffsData, [staffsData]);

  return { staffsData: memoizedStaffs, loading, setStaffsData };
};

export default useStaffs;
