import React from "react";
import PageWrapper from "../../../../../components/PageWrapper";
import PrintHeader from "../../../../../components/Header/PrintHeader";
import PageSectionHeader from "../../../../../components/PageSectionHeader";

// react-to-print
import { useReactToPrint } from "react-to-print";

import { Flex, Button } from "@chakra-ui/react";

import { ComponentToPrint } from "../../../../../components/atoms/ComponentToPrint";
import { useRef } from "react";
import { MdAdd, MdImportExport, MdPayment, MdPrint } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UserInvoicePage() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();

  return (
    // Add print option
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`Generate Invoice`}
        pageCrumb={`Home / Invoices / New`}
      />

      <Flex gap={4} fontSize={"sm"} className="w-full justify-end mb-8">
        <Button
          size={"sm"}
          colorScheme={"blue"}
          variant={"outline"}
          leftIcon={<MdPrint />}
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button
          size={"sm"}
          colorScheme={"blue"}
          leftIcon={<MdPayment />}
          onClick={() => navigate("/admin/parents/new")}
        >
          Pay online
        </Button>
      </Flex>

      <ComponentToPrint ref={componentRef} />
    </PageWrapper>
  );
}
