import { useState, useEffect, useMemo } from "react";
import axios from "../../api/axios";

const useFees = (feeType = "", session, term) => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get(
          `/api/v1/fees${
            feeType ? `/${feeType}?session=${session}&term=${term}` : ""
          }`
        );
        setFees(response.data || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching fees:", error.message);
        setLoading(false);
      }
    };

    fetchFees();
  }, [feeType, session, term]);

  const memoizedFees = useMemo(() => fees, [fees]);
  return { fees: memoizedFees, loading };
};

const useStudentFee = (feeType, studentId, feeTypeId, session, term) => {
  const [studentFeeData, setStudentFeeData] = useState(); // returns feeAmount, feeBalance, totalPaidAmount
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeBalance = async () => {
      try {
        const response = await axios.get(
          `api/v1/fees/calculateFee?studentId=${studentId}&feeTypeId=${feeTypeId}&feeType=${feeType}&session=${session}&term=${term}`
        );
        setStudentFeeData(response.data || 0);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching fees:", error.message);
        setLoading(false);
      }
    };

    fetchFeeBalance();
  }, [feeType, session, term, studentId, feeTypeId]);

  const memoizedStudnetFeeData = useMemo(
    () => studentFeeData,
    [studentFeeData]
  );
  return { studentFeeData: memoizedStudnetFeeData, loading };
};

export { useFees, useStudentFee };
