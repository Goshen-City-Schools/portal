import React from "react";
import SessionTerm from "../components/forms/SessionTerm.form";
import PageWrapper from "../components/PageWrapper";

import { motion } from "framer-motion";

export default function Home() {
  // const user = localStorage.getItem("user");
  return (
    <PageWrapper>
      <SessionTerm />
    </PageWrapper>
  );
}
