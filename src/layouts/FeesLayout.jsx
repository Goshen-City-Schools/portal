import React from "react";
import PageWrapper from "../components/PageWrapper";
import { useParams } from "react-router-dom";
import PageSectionHeader from "../components/PageSectionHeader";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import StudentTransactionsTable from "../components/tables/payments/StudentTransactionsTable";
import { useFees } from "../hooks";

export default function FeesLayout() {
  const { feeType } = useParams();

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`${feeType} Fee`}
        pageCrumb={`Home / Fees / ${feeType}`}
      />

      <Routes>
        <Route index element={<StudentTransactionsTable />} />
        <Route path="tution" element={<StudentTransactionsTable />} />
      </Routes>
    </PageWrapper>
  );
}
