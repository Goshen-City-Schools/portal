import { useState, useEffect, useMemo } from "react";
import axios from "../../api/axios";

const useFees = (feeType = "") => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get(
          `/api/v1/fees${feeType ? `/${feeType}` : ""}`
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
  }, [feeType]);

  const memoizedFees = useMemo(() => fees, [fees]);
  return { fees: memoizedFees, loading };
};

const useStudentFee = (feeType, studentId, feeTypeId) => {
  const [studentFeeData, setStudentFeeData] = useState(); // returns feeAmount, feeBalance, totalPaidAmount
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeBalance = async () => {
      try {
        const response = await axios.get(
          `api/v1/fees/calculateFee?studentId=${studentId}&feeTypeId=${feeTypeId}&feeType=${feeType}`
        );
        setStudentFeeData(response.data || 0);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching fees:", error.message);
        setLoading(false);
      }
    };

    fetchFeeBalance();
  }, [feeType, studentId, feeTypeId]);

  const memoizedStudnetFeeData = useMemo(
    () => studentFeeData,
    [studentFeeData]
  );
  return { studentFeeData: memoizedStudnetFeeData, loading };
};

export { useFees, useStudentFee };
