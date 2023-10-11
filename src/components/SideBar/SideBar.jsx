import React from 'react';
import Logo from '../Logo.component';

import { Box } from '@chakra-ui/react';

import { TbSchool, TbReport } from 'react-icons/tb';
import { BiLogOutCircle } from 'react-icons/bi';
import { PiDotsNine } from 'react-icons/pi';
import {
  MdOutlineBed,
  MdOutlineAssignment,
  MdOutlineSupportAgent,
  MdOutlinePrecisionManufacturing,
} from 'react-icons/md';

import './SideMenu.style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Flex, Text } from '@chakra-ui/react';

export default function SideBar() {
  const [subMenuIsActive, setSubMenuIsActive] = useState(false);

  return (
    <Box
      bg={'brand.900'}
      className="fixed top-0 text-sm left-0 h-screen max-w-[260px] w-full"
    >
      <Box
        position={'relative'}
        zIndex={50}
        className="sideBar-header h-max shadow-md flex items-center  w-full"
      >
        <Logo />
        <Flex direction={'column'} justifyContent={'center'}>
          <Text
            as={'p'}
            className="text-lg font-bold leading-tight"
            color={'neutral.100'}
          >
            GOSHEN CITY INTL.
          </Text>
          <Text
            as={'small'}
            color="neutral.300"
            className="text-[.7rem] font-bold uppercase"
          >
            Creche . Nursery . Primary
          </Text>
        </Flex>
      </Box>

      <Box className="pl-5 py-6" color="neutral.100">
        <h3>MENU</h3>

        <Box className="memuList">
          <li className="flex px-6 py-3 gap-4 justify-start font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <PiDotsNine size={16} />
            </div>
            Dashboard
          </li>
          <li className="flex px-6 py-3 gap-4 justify-start font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineAssignment size={18} />
            </div>
            Assignments
          </li>
          <li className="flex px-6 py-3 gap-4 justify-start font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <TbReport size={18} />
            </div>
            My Results
          </li>{' '}
          <li>
            <Link
              to={'/fees/invoices'}
              className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            >
              <div className="icon h-6 w-6 flex items-center justify-center">
                <TbSchool size={18} />
              </div>
              Transactions
            </Link>
          </li>
          <li className="flex px-6 py-3 gap-4 justify-start font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            School Bus
          </li>
          <li className="flex px-6 py-3 gap-4 justify-start font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            Hostel Boarding
          </li>
          <li className="flex px-6 py-3 gap-4 justify-start font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            School Events
          </li>
        </Box>
      </Box>

      <Box className="pl-5 py-6" color="neutral.100">
        <h3>ACCOUNT</h3>
        <Box className="memuList">
          {/*  */}
          <li className="flex justify-start px-6 py-3 gap-4 font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineSupportAgent size={20} />
            </div>
            Help and Support
          </li>
          <li className="flex justify-start px-6 py-3 gap-4 font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlinePrecisionManufacturing size={20} />
            </div>
            Settings
          </li>
          <li className="flex justify-start px-6 py-3 gap-4 font-bold items-center">
            <div className="icon h-6 w-6 flex items-center justify-center">
              <BiLogOutCircle size={20} />
            </div>
            Logout
          </li>
        </Box>{' '}
      </Box>
    </Box>
  );
}

const AdminSideMenu = () => {};

const UserSideMenu = () => {};
