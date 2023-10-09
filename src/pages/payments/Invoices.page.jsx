import React from 'react';

// Icons
import { FaEye } from 'react-icons/fa';
import formatDate from '../../utilities/formatDate.utils';
import { Link } from 'react-router-dom';

export default function InvoicesPage() {
  return (
    <>
      <div className="pageTitleTop flex w-full items-center justify-between px-6 py-4 gap-4">
        <h2 className="text-2xl font-bold">Invoices</h2>

        <div className="flex gap-4 items-center">
          <div className="inputContainer">
            <select name="" id="">
              <option value="">ALL</option>
              <option value="">HOSF</option>
              <option value="">BUSF</option>
            </select>
          </div>

          <Link to={'/fees/invoices/new'}>
            <button className="bg-green-700 px-4 py-2 text-sm font-bold rounded-lg text-gray-50">
              Generate New Invoice
            </button>
          </Link>
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
              <span>{formatDate(Date.now())}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <Link to={'/fees/invoices/1'}>
                <button className="px-4 py-2 rounded-lg bg-green-200 flex gap-2 font-bold items-center">
                  <FaEye /> View
                </button>
              </Link>
            </td>
          </tr>

          {/*  */}
          <tr>
            <td>
              <span>{formatDate(Date.now())}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <Link to={'/fees/invoices/1'}>
                <button className="px-4 py-2 rounded-lg bg-green-200 flex gap-2 font-bold items-center">
                  <FaEye /> View
                </button>
              </Link>
            </td>
          </tr>
          {/*  */}
          <tr>
            <td>
              <span>{formatDate(Date.now(), 'short')}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <Link to={'/fees/invoices/1'}>
                <button className="px-4 py-2 rounded-lg bg-green-200 flex gap-2 font-bold items-center">
                  <FaEye /> View
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <span>{formatDate(Date.now())}</span>
            </td>
            <td>
              <span>SCHF4567283784</span>
            </td>
            <td>
              <span>SCHOOL FEES</span>
            </td>
            <td>
              <Link to={'/fees/invoices/1'}>
                <button className="px-4 py-2 rounded-lg bg-green-200 flex gap-2 font-bold items-center">
                  <FaEye /> View
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
