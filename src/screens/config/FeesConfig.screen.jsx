import React from "react";
import { useState } from "react";

import { Box, Flex, Button, FormControl, Select } from "@chakra-ui/react";
import { useModal } from "../../app/contexts/ModalContext";
import {
  CreateBoardingsFee,
  CreateBusFee,
  CreateTuitionFee,
} from "../../portals";
import {
  BoardingFeeTable,
  BusFeeTable,
  TuitionFeeTable,
} from "../../components/tables";
import { MdAdd } from "react-icons/md";
import { Suspense } from "react";

export default function FeesConfigScreen() {
  const [formData, setFormData] = useState({
    session: "",
    term: "",
    feeType: "",
  });

  const { session, term, feeType } = formData;

  const { openPortal } = useModal();

  function handleOptionChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  return (
    <Box>
      <Flex
        justifyContent={"flex-end"}
        alignItems={"center"}
        mb={4}
        w={"full"}
        gap={4}
      >
        <Button
          flexShrink={0}
          size={"sm"}
          colorScheme="facebook"
          variant={"outline"}
          ml={"auto"}
          leftIcon={<MdAdd />}
          onClick={() => {
            openPortal(
              feeType == "tuition" ? (
                <CreateTuitionFee />
              ) : feeType == "bus" ? (
                <CreateBusFee />
              ) : (
                <CreateBoardingsFee />
              )
            );
          }}
        >
          {feeType == "tuition"
            ? "New Tuition Fee"
            : feeType == "bus"
            ? "New Bus Fee"
            : "New Boarding Fee"}
        </Button>
      </Flex>

      <Flex gap={4} mb={8}>
        {/* Session Select */}
        <FormControl>
          <Select
            value={formData?.session}
            size={"sm"}
            name="session"
            onChange={handleOptionChange}
          >
            <option value={""}>-- Select Session --</option>
            <option value={"20222023"}>2022 - 2023</option>
            <option value={"20232024"}>2023 - 2024</option>
            <option value={"20242025"}>2024 - 2025</option>
          </Select>
        </FormControl>

        {/* Term Select */}
        <FormControl>
          <Select
            onChange={handleOptionChange}
            name="term"
            value={formData?.term}
            size={"sm"}
          >
            <option value={""}>-- Select Term --</option>
            <option value={"term1"}>First term</option>
            <option value={"term2"}>Second term</option>
            <option value={"term3"}>Third term</option>
          </Select>
        </FormControl>

        {/* Fee type Select */}
        <FormControl>
          <Select
            onChange={handleOptionChange}
            value={formData?.feeType}
            fontSize={"sm"}
            size={"sm"}
            name="feeType"
          >
            <option value="">-- Select Fee Type --</option>
            <option value="tuition">Tuition Fee</option>
            <option value="bus">Bus Fee</option>
            <option value="boarding">Boarding Fee</option>
          </Select>
        </FormControl>
      </Flex>

      <Suspense fallback={"Loading..."}>
        {session && term && feeType === "tuition" && (
          <TuitionFeeTable session={session} term={term} feeType={feeType} />
        )}
        {session && term && feeType === "bus" && (
          <BusFeeTable session={session} term={term} feeType={feeType} />
        )}
        {session && term && feeType === "boarding" && (
          <BoardingFeeTable session={session} term={term} feeType={feeType} />
        )}
      </Suspense>
    </Box>
  );
}
