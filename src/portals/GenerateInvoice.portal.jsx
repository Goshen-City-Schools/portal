import React from "react";
import PortalTitle from "./shared/PortalTitle";
import GenerateInvoiceForm from "../components/forms/GenerateInvoiceForm";

export default function GenerateInvoicePortal() {
  return (
    <div>
      <PortalTitle title={"Generate Invoice"} />

      <GenerateInvoiceForm action="edit" />
    </div>
  );
}
