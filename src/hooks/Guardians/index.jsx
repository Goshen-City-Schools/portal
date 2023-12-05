import { useEffect } from "react";
import { useState } from "react";
import axios from "../../api/axios";

const useGuardians = () => {
  const [guardiansData, setGuardiansData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/guardians"); // Update with your API endpoint
        setGuardiansData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching guardians:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const memoizedGuardians = useMemo(() => guardiansData, [guardiansData]);

  return { guardiansData: memoizedGuardians, loading, setGuardiansData };
};

export { useGuardians };
