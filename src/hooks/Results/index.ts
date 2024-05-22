import { useEffect, useState, useCallback } from "react";
import axios from "../../api/axios";

interface Student {
  studentId: string;
  studentClass: number;
}

interface ResultData {
  id: number;
  created_at: string;
  academic_session: number;
  academic_term: number;
  student: Student;
  subject: number;
  test1: string;
  test2: string;
  exam: string;
}

const useResults = (
  session: string | null,
  term: string | null,
  classId: string | null,
  subjectId: string | null,
  studentId: string | null
) => {
  const [resultData, setResultData] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Construct the query string based on provided parameters
      const queryParams = new URLSearchParams();
      if (session) queryParams.append("session", session);
      if (term) queryParams.append("term", term);
      if (classId) queryParams.append("classId", classId);
      if (subjectId) queryParams.append("subjectId", subjectId);
      if (studentId) queryParams.append("studentId", studentId);

      const response = await axios.get<ResultData[]>(
        `/api/v1/results?${queryParams.toString()}`
      );

      setResultData(response.data);
    } catch (error) {
      console.error("Error fetching results:", (error as Error).message);
      setError("An error occurred while fetching results.");
    } finally {
      setLoading(false);
    }
  }, [session, term, classId, subjectId, studentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, session, term, classId, subjectId, studentId]);

  return { resultData, loading, error };
};

export { useResults };
