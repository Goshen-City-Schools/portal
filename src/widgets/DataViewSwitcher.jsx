import React from "react";
import { HStack, Grid } from "@chakra-ui/react";
import { MdGridView, MdTableChart } from "react-icons/md";
import IconComponent from "../components/Icon.component";

const DataViewSwitcher = ({ dataView, handleDataView }) => {
  return (
    <HStack>
      <Grid
        cursor={"pointer"}
        placeItems={"center"}
        color={"neutral.600"}
        bg={dataView === "grid" ? "red.100" : "neutral.300"}
        rounded={"lg"}
        onClick={() => handleDataView("grid")}
      >
        <IconComponent>
          <MdGridView />
        </IconComponent>
      </Grid>
      <Grid
        cursor={"pointer"}
        placeItems={"center"}
        color={"neutral.600"}
        bg={dataView === "table" ? "red.100" : "neutral.300"}
        rounded={"lg"}
        onClick={() => handleDataView("table")}
      >
        <IconComponent>
          <MdTableChart />
        </IconComponent>
      </Grid>
    </HStack>
  );
};

export default DataViewSwitcher;
