import { useEffect } from "react";
import { getAcademicSessions, getAcademicTerms } from "../../api/academics.api";
import { useState } from "react";
import { useMemo } from "react";

// All academic sessions

const useAcademicSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getAcademicSessions();
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

// All academic terms

const useAcademicTerms = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getAcademicTerms();
        setTerms(response || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Terms:", error.message);
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const memoizedTerms = useMemo(() => terms, [terms]);
  return { terms: memoizedTerms, loading };
};

export { useAcademicSessions, useAcademicTerms };
