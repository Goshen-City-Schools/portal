import React from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

const ViewResultPage = () => {
  const { session, term, userId } = useParams();

  // Replace this with your logic to fetch and display the result data
  const resultData = {
    // Sample data for demonstration
    session,
    term,
    userId,
    // Add more result-related data here
  };

  return (
    <PageWrapper>
      <PageSectionHeader pageTitle={`Student ${userId} Result`} />
      <div>
        <h1>Result Page</h1>
        <p>Session: {resultData.session}</p>
        <p>Term: {resultData.term}</p>
        <p>User ID: {resultData.userId}</p>
        {/* Display result data here */}
      </div>
    </PageWrapper>
  );
};

export default ViewResultPage;
