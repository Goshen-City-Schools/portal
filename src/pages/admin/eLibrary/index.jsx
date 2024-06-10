import React from "react";
import PageSectionHeader from "../../../components/PageSectionHeader";
import PageWrapper from "../../../components/PageWrapper";

import { Flex, Button, Input } from "@chakra-ui/react";
import IconComponent from "../../../components/Icon.component";
import { MdAdd } from "react-icons/md";

function ELibraryPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"e-Library"}
        pageCrumb={"Home / e-Library"}
      />

      <Flex
        gap={4}
        fontSize={"sm"}
        py={6}
        justifyContent={"space-between"}
        className="no-print"
      >
        <div className="flex gap-4">
          <Input type="search" />
        </div>

        <div className="flex gap-4">
          <Button
            bg={"brand.700"}
            color={"neutral.100"}
            gap={2}
            rounded={"md"}
            border={"1px solid"}
            borderColor={"transparent"}
            _hover={{
              bg: "transparent",
              color: "brand.700",
              borderColor: "brand.700",
            }}
          >
            <IconComponent>
              <MdAdd size={20} />
            </IconComponent>
            Add New Resource
          </Button>
        </div>
      </Flex>

      <div className="h-[480px] grid place-items-center">
        <h3 className="text-xl ">No resource added recently</h3>
      </div>
    </PageWrapper>
  );
}

export default ELibraryPage;
