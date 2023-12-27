import React from "react";
import { useState } from "react";

import {
  Box,
  Flex,
  Button,
  FormControl,
  Select,
  FormLabel,
} from "@chakra-ui/react";
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

export default function FeesConfigScreen() {
  const [feeView, setFeeView] = useState("tuition");

  const { openPortal } = useModal();

  const handleOptionChange = (e) => {
    e.preventDefault();
    setFeeView(e.target.value);
  };

  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={8}
        w={"full"}
        gap={4}
      >
        <FormControl
          gap={2}
          fontSize={"sm"}
          flexDirection={"row"}
          display={"flex"}
          size={"sm"}
          alignItems={"center"}
          width={"full"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Fee Type:
          </FormLabel>

          <Select onChange={handleOptionChange} fontSize={"sm"} size={"sm"}>
            <option value="tuition">Tuition</option>
            <option value="bus">Bus</option>
            <option value="boarding">Boarding</option>
          </Select>
        </FormControl>

        <Button
          flexShrink={0}
          size={"sm"}
          colorScheme="facebook"
          variant={"outline"}
          ml={"auto"}
          onClick={() => {
            openPortal(
              feeView == "tuition" ? (
                <CreateTuitionFee />
              ) : feeView == "bus" ? (
                <CreateBusFee />
              ) : (
                <CreateBoardingsFee />
              )
            );
          }}
        >
          {feeView == "tuition"
            ? "Add Tuition Fee"
            : feeView == "bus"
            ? "Add Bus Fee"
            : "Add Boarding Fee"}
        </Button>
      </Flex>

      {feeView === "tuition" && <TuitionFeeTable />}
      {feeView === "bus" && <BusFeeTable />}
      {feeView === "boarding" && <BoardingFeeTable />}
    </Box>
  );
}
