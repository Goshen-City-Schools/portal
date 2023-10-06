import React from 'react';
import Logo from './Logo.component';

import { FaChevronDown } from 'react-icons/fa';
import { TbSchool, TbCurrencyNaira, TbReport } from 'react-icons/tb';
import { BiBusSchool, BiLogOutCircle } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';
import {
  MdOutlineBed,
  MdOutlineAssessment,
  MdOutlineAssignment,
  MdOutlineSupportAgent,
} from 'react-icons/md';
import { PiExam } from 'react-icons/pi';

import './SideMenu.style.css';
import { useState } from 'react';

export default function SideMenu() {
  const [subMenuIsActive, setSubMenuIsActive] = useState(false);
  return (
    <aside className="absolute top-0 text-sm shadow-purple-300 shadow-sm left-0 h-screen bg-blue-800 max-w-[280px] w-full">
      <div className="h-20 border-b flex items-center justify-center w-full">
        <Logo />
      </div>

      <ul className="memuList p-6 text-gray-200">
        <li className="flex justify-start gap-4 font-bold items-center">
          <div className="icon h-6 w-6 flex items-center justify-center">
            <FiHome size={18} />
          </div>
          Home
        </li>
        <li>
          <span>
            Payments <FaChevronDown />
          </span>
          <ul>
            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <TbSchool size={18} />
              </div>
              School Fees
            </li>
            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <BiBusSchool size={16} />
              </div>
              Transport Fees
            </li>
            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <MdOutlineBed size={18} />
              </div>
              Hostel Fees
            </li>

            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <TbCurrencyNaira size={20} />
              </div>
              Transactions History
            </li>
          </ul>
        </li>
        <li>
          <span>
            Computer Based Test <FaChevronDown />
          </span>
          <ul>
            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <MdOutlineAssessment size={20} />
              </div>
              Assessment
            </li>
            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <PiExam size={20} />
              </div>
              Examination
            </li>
            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <MdOutlineAssignment size={18} />
              </div>
              Assignment
            </li>
            <li>
              <div className="icon h-6 w-6 flex items-center justify-center">
                <TbReport size={18} />
              </div>
              Result
            </li>
          </ul>
        </li>
        <li className="flex justify-start gap-4 font-bold items-center">
          <div className="icon h-6 w-6 flex items-center justify-center">
            <MdOutlineSupportAgent size={20} />
          </div>
          Help and Support
        </li>
        <li className="flex justify-start gap-4 font-bold items-center">
          <div className="icon h-6 w-6 flex items-center justify-center">
            <BiLogOutCircle size={20} />
          </div>
          Logout
        </li>
      </ul>
    </aside>
  );
}

const AdminSideMenu = () => {};

const UserSideMenu = () => {};
