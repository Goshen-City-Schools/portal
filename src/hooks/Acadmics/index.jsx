import { useEffect } from "react";
import { getAcademicSessisons } from "../../api/academics.api";
import { useState } from "react";
import { useMemo } from "react";

const useAcademicSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getAcademicSessisons();
        setSessions(response || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Sessions:", error.message);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const memoizedSessions = useMemo(() => sessions, [sessions]);
  return { sessions: memoizedSessions, loading };
};

export { useAcademicSessions };
