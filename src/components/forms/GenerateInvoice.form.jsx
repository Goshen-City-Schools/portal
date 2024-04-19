import React from "react";
import { useFees } from "../../hooks";
import { Input } from "@chakra-ui/react";
import { FormButton } from "../shared";

export default function GenerateInvoice() {
  const fees = useFees();
  return (
    <div className="formContainer w-full  max-w-sm mx-auto ">
      <h2 className="px-4  font-bold  text-center w-max mx-auto text-2xl mb-4 text-purple-800">
        GENERATE INVOICE
      </h2>

      <form
        className="px-6 py-6 shadow-md w-full  h-max rounded-sm bg-white"
        // onSubmit={handleSubmit}
      >
        <div className="inputContainer">
          <label htmlFor="session">Session:</label>
          <select name="" id="">
            <option value="">2022 - 2023</option>
            <option value="" selected>
              2023 - 2024
            </option>
            <option value="">2024 - 2025</option>
          </select>
        </div>
        <div className="inputContainer">
          <label htmlFor="term">Term:</label>
          <select name="term" id="">
            <option value="1">First Term</option>
            <option value="2">Second Term</option>
            <option value="3">Third Term</option>
          </select>
        </div>

        {/* payment purpose */}
        <div className="inputContainer">
          <label htmlFor="session">Purpose:</label>
          <select name="" id="">
            <option value="">SCHOOL FEES</option>
            <option value="">HOSTEL FEES</option>
            <option value="">BUS FEES</option>
          </select>
        </div>

        <div className="inputContainer">
          <label htmlFor="session">Amount:</label>
          <Input />
        </div>

        {/*  */}
        <div className="inputContainer">
          <label htmlFor="session">Pay by:</label>
          <select name="" id="">
            <option value="">Cash payment</option>
            <option value="">Bank TRANSFER</option>
            <option value="">Bank DEPOSIT</option>
          </select>
        </div>

        <div className="flex w-full flex-col gap-3 justify-around mt-4 text-sm ">
          <FormButton label={"Generate Invoice"} />
        </div>
      </form>
    </div>
  );
}
