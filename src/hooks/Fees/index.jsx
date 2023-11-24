import { useState, useEffect, useMemo } from "react";
import axios from "../../api/axios";
// import axios from "axios";

const useFees = (route = "") => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get(
          `/api/v1/fees${route ? `/${route}` : ""}`
        );
        setFees(response.data || []);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching fees:", error.message);
        setLoading(false);
      }
    };

    fetchFees();
  }, [route]);

  const memoizedFees = useMemo(() => fees, [fees]);

  return { fees: memoizedFees, loading };
};

export default useFees;
