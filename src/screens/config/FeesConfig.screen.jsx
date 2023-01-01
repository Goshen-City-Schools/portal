import React from "react";
import { useState } from "react";

import TuitionFeeConfigScreen from "./TuitionFeeConfig.screen";
import BusFeeConfigScreen from "./BusFeeConfig.screen";
import BoardingFeeConfigScreen from "./BoardingFeeConfig.screen";

import { Box, Flex, FormControl, Select } from "@chakra-ui/react";

export default function FeesConfigScreen() {
  const [feeView, setFeeView] = useState("tuition");

  const handleOptionChange = (e) => {
    e.preventDefault();
    setFeeView(e.target.value);
  };

  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Fees"} />

        <FormControl gap={4} fontSize={"sm"}>
          <FormLabel>Fee Type:</FormLabel>

          <Select onChange={handleOptionChange}>
            <option value="tuition">Tuition</option>
            <option value="bus">Bus</option>
            <option value="boarding">Boarding</option>
          </Select>
        </FormControl>
      </Flex>

      {feeView === "tuition" && <TuitionFeeConfigScreen />}
      {feeView === "bus" && <BusFeeConfigScreen />}
      {feeView === "boarding" && <BoardingFeeConfigScreen />}
    </Box>
  );
}
