// useStaffs.js
import { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";

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

const useStaffRoles = () => {
  const [staffRolesData, setStaffRolesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/staff/roles"); // Update with your API endpoint
        setStaffRolesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff roles:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const memoizedStaffRoles = useMemo(() => staffRolesData, [staffRolesData]);

  return { staffRolesData: memoizedStaffRoles, loading, setStaffRolesData };
};

const useStaff = (staffId) => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/staff/${staffId}`); // Update with your API endpoint
        setStaffData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staffs:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const memoizedStaff = useMemo(() => staffData, [staffData]);

  return { staffData: memoizedStaff, loading, setStaffData };
};

export { useStaffs, useStaff, useStaffRoles };
