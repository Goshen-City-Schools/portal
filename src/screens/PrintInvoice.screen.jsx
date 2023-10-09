import React from 'react';

//
import { PiDownloadDuotone } from 'react-icons/pi';
import { AiOutlinePrinter } from 'react-icons/ai';
// import { GiPayMoney } from 'react-icons/gi';

export default function PrintInvoiceScreen() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-2xl font-bold">Invoice</h3>
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
      <div className="my-8 w-full max-w-2xl mx-auto rounded-lg shadow-md px-6 py-8">
        <div className="invoice-header flex flex-col text-center items-center">
          <div className="w-32 h-32 relative mx-auto">
            <img
              src="/Goshen-logo.jpg"
              alt="Goshen logo"
              loading="lazy"
              height={96}
              width={96}
              className="w-full h-full object-cover absolute"
            />
          </div>
          <h3 className="school-name text-xl font-bold">
            GOSHEN GROUP OF SCHOOLS
          </h3>
          <p className="school-section text-sm leading-tight">
            Daycare, Nursery and Primary
          </p>
          <div className="flex flex-col text-center w-full">
            <p className="school-address text-sm">
              <span className="font-bold">Address: </span> Plot 11 - 14, Living
              Avenue, Opp. Police Detective College, Ologo Enugu, Nigieria
            </p>

            <div className="flex school-contact justify-center gap-2 text-sm">
              <p className="school-contant_tel">
                <span className="font-bold">Tel: </span>+234, +234
              </p>
              <p className="school-contant_email">
                <span className="font-bold">Email: </span>
                mail@goshencityschools.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
