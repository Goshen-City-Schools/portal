import React from 'react';
import Logo from '../Logo.component';

import { Box, List, ListItem, Flex, Text } from '@chakra-ui/react';

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
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logout } from '../../app/redux/slices/formSlice';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" button is clicked
    dispatch(logout());
    console.log('m');
    setTimeout(() => {
      navigate('/auth');
    }, 1000); // Adjust the delay as needed
  };

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
        <Text as="h3" marginBottom={2}>
          MENU
        </Text>

        <List className="memuList">
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <PiDotsNine size={16} />
            </div>
            Dashboard
          </ListItem>
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineAssignment size={18} />
            </div>
            Assignments
          </ListItem>
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <TbReport size={18} />
            </div>
            My Results
          </ListItem>{' '}
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            marginTop={'0'}
          >
            <Link
              to={'/fees/invoices'}
              className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            >
              <div className="icon h-6 w-6 flex items-center justify-center">
                <TbSchool size={18} />
              </div>
              Transactions
            </Link>
          </ListItem>
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            School Bus
          </ListItem>
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            Hostel Boarding
          </ListItem>
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            School Events
          </ListItem>
        </List>
      </Box>

      <Box className="pl-5 py-6" color="neutral.100">
        <Text as="h3" marginBottom={2}>
          ACCOUNT
        </Text>
        <List className="memuList">
          {/*  */}
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex justify-start px-6 py-3 gap-4 font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineSupportAgent size={20} />
            </div>
            Help and Support
          </ListItem>
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex justify-start px-6 py-3 gap-4 font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlinePrecisionManufacturing size={20} />
            </div>
            Settings
          </ListItem>
          <ListItem
            roundedTopLeft={'md'}
            roundedBottomLeft={'md'}
            _hover={{ bg: 'brand.700', color: ' white', cursor: 'pointer' }}
            className="flex justify-start px-6 py-3 gap-4 font-bold items-center"
            onClick={handleLogout}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <BiLogOutCircle size={20} />
            </div>
            Logout
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
