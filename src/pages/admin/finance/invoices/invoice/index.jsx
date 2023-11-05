import React from "react";
import PageWrapper from "../../../../../components/PageWrapper";

import { PiDownloadDuotone } from "react-icons/pi";
import { AiOutlinePrinter } from "react-icons/ai";
import PrintHeader from "../../../../../components/Header/PrintHeader";
import PageSectionHeader from "../../../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";
// import PrintHeader from "../components/Header/PrintHeader";

export const InvoicePage = () => {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"New Invoice"}
        pageCrumb={"Home / Transactions / Invoices / New"}
      />
      <div className="p-6">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-2xl font-bold">&nbsp;</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg text-sm flex gap-2 items-center bg-green-300">
              {/* <GiPayMoney size={20} /> I've made Payment */}
            </button>
            <button className="px-4 py-2 rounded-lg text-sm flex gap-2 items-center bg-orange-500">
              <PiDownloadDuotone size={20} /> Download
            </button>
            <button className="px-4 py-2 rounded-lg text-sm flex gap-2 items-center bg-red-300">
              <AiOutlinePrinter size={20} /> Print
            </button>
          </div>
        </div>
      </div>{" "}
      <Box bg={"white"} p={6} rounded={"md"}>
        <PrintHeader />
      </Box>
    </PageWrapper>
  );
};
