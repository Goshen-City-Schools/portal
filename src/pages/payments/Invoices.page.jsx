import React from 'react';

// Icons
import { BsThreeDots } from 'react-icons/bs';
import formatDate from '../../utilities/formatDate.utils';
import { Link } from 'react-router-dom';

import {
  Button,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
} from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper';

export default function InvoicesPage() {
  return (
    <PageWrapper>
      <div className="pageTitleTop pl-2 flex w-full items-center justify-between pb-4 gap-4">
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
            <Button bg={'green.700'} color={'gray.50'} size={'sm'}>
              Generate New Invoice
            </Button>
            <button></button>
          </Link>
        </div>
      </div>{' '}
      <TableContainer paddingX={6} paddingY={4} bg={'white'} rounded={'2xl'}>
        <Table variant={'simple'} fontWeight={400}>
          <Thead>
            <Tr bg={'neutral.100'} rounded={'2xl'}>
              <Th>S/N</Th>
              <Th>Date</Th>
              <Th>Transaction Ref No.</Th>
              <Th>Purpose</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody fontSize={'14'}>
            {/*  */}
            <Tr>
              <Td>
                <span>1</span>
              </Td>
              <Td>
                <span>{formatDate(Date.now())}</span>
              </Td>
              <Td>
                <span>SCHF4567283784</span>
              </Td>
              <Td>
                <span>SCHOOL FEES</span>
              </Td>
              <Td>
                <Link to={'/fees/invoices/1'}>
                  <Button
                    paddingX={4}
                    paddingY={2}
                    bg={'brand.200'}
                    height={'max-content'}
                  >
                    <BsThreeDots />
                  </Button>
                </Link>
              </Td>
            </Tr>

            {/*  */}
            <Tr>
              <Td>
                <span>1</span>
              </Td>
              <Td>
                <span>{formatDate(Date.now())}</span>
              </Td>
              <Td>
                <span>SCHF4567283784</span>
              </Td>
              <Td>
                <span>SCHOOL FEES</span>
              </Td>
              <Td>
                <Link to={'/fees/invoices/1'}>
                  <Button
                    paddingX={4}
                    paddingY={2}
                    bg={'brand.200'}
                    height={'max-content'}
                  >
                    <BsThreeDots />
                  </Button>
                </Link>
              </Td>
            </Tr>
            {/*  */}
            <Tr>
              <Td>
                <span>1</span>
              </Td>
              <Td>
                <span>{formatDate(Date.now(), 'short')}</span>
              </Td>
              <Td>
                <span>SCHF4567283784</span>
              </Td>
              <Td>
                <span>SCHOOL FEES</span>
              </Td>
              <Td>
                <Link to={'/fees/invoices/1'}>
                  <Button
                    paddingX={4}
                    paddingY={2}
                    bg={'brand.200'}
                    height={'max-content'}
                  >
                    <BsThreeDots />
                  </Button>
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <span>1</span>
              </Td>
              <Td>
                <span>{formatDate(Date.now())}</span>
              </Td>
              <Td>
                <span>SCHF4567283784</span>
              </Td>
              <Td>
                <span>SCHOOL FEES</span>
              </Td>
              <Td>
                <Link to={'/fees/invoices/1'}>
                  <Button
                    paddingX={4}
                    paddingY={2}
                    bg={'brand.200'}
                    height={'max-content'}
                  >
                    <BsThreeDots />
                  </Button>
                </Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </PageWrapper>
  );
}
