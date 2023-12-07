import React, { useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useNavigate } from "react-router-dom";

export default function AccessRestricted() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/auth");
    }, 3000);

    return () => {
      // Clear the timer if the component unmounts
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return <PageWrapper>Access Restricted</PageWrapper>;
}
