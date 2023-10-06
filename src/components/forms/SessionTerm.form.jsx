import React from 'react';

export default function SessionTerm() {
  function generrateInvoice() {}
  return (
    <div className="formContainer w-full  max-w-sm mx-auto">
      <h2 className="px-4  font-bold  text-center w-max mx-auto text-2xl mb-4 text-purple-800">
        SCHOOL FEES
      </h2>

      <form className="px-6 py-6 shadow-md w-full  h-max">
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
          <label htmlFor="session">Term:</label>
          <select name="" id="">
            <option value="">First Term</option>
            <option value="">Second Term</option>
            <option value="">Third Term</option>
          </select>
        </div>

        <div className="flex w-full flex-col gap-3 justify-around mt-4 text-sm ">
          <button className="bg-red-700 text-cyan-50 font-bold">
            Generate invoice
          </button>
          <button disabled className="bg-green-700 text-cyan-50 font-bold">
            Print receipt
          </button>
        </div>
      </form>
    </div>
  );
}
