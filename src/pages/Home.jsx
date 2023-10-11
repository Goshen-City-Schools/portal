import React from "react";
import SessionTerm from "../components/forms/SessionTerm.form";

export default function Home() {
  // const user = localStorage.getItem("user");
  return (
    <div className="paySection flex justify-center pt-20">
      <SessionTerm />
    </div>
  );
}
