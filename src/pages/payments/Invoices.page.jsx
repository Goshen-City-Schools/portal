import React from 'react';

export default function InvoicesPage() {
  return (
    <div>
      <table>
        <thead>
          <th>Date</th>
          <th>Transaction Ref. No.</th>
          <th>Purpose</th>
          <th>Status</th>
        </thead>
        <tbody>
          <tr>
            <td>{Date.now()}</td>
            <td>uhgr4567283784b3j4</td>
            <td>SCHOOL FEES</td>
            <td>PAID</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
