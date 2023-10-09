import React from 'react';

// Icons
import { FaEye } from 'react-icons/fa';

export default function ReceiptsPage() {
  return (
    <div>
      <div className="pageTitleTop flex w-full items-center justify-between px-6 py-4 gap-4">
        <h2 className="text-2xl font-bold">Receipts</h2>

        <div className="flex">
          <div className="inputContainer">
            <select name="" id="">
              <option value="">ALL</option>
              <option value="">HOSF</option>
              <option value="">BUSF</option>
            </select>
          </div>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <th>Date</th>
          <th>Transaction Ref. No.</th>
          <th>Purpose</th>
          <th>Action</th>
        </thead>
        <tbody>
          {/*  */}
          <tr>
            <td>
              <span>{Date.now()}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <span className="flex gap-2 items-center">
                <FaEye /> View
              </span>
            </td>
          </tr>

          {/*  */}
          <tr>
            <td>
              <span>{Date.now()}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <span className="flex gap-2 items-center">
                <FaEye /> View
              </span>
            </td>
          </tr>
          {/*  */}
          <tr>
            <td>
              <span>{Date.now()}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <span className="flex gap-2 items-center">
                <FaEye /> View
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>{Date.now()}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <span className="flex gap-2 items-center">
                <FaEye /> View
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
