import React from "react";

import { Text, Flex, Box } from "@chakra-ui/react";

export default function PrintHeader() {
  return (
    <div className="invoice-header flex flex-col text-center items-center">
      <Flex justifyContent={"center"} alignItems={"center"}>
        <div className="w-24 h-24 relative mx-auto">
          <img
            src="/Goshen-logo-trans.png"
            alt="Goshen logo"
            loading="lazy"
            height={24}
            width={24}
            className="w-full h-full object-cover absolute"
          />
        </div>
        <Box>
          <h3 className="school-name text-xl font-bold">
            GOSHEN GROUP OF SCHOOLS
          </h3>
          <p className="school-section text-sm leading-tight">
            Creche, Nursery, Primary and Secondary
          </p>
          <Text as={"p"} mt={1} mb={1} fontSize={"sm"}>
            <span className="font-bold">Motto: </span>Wisdom, the principal
            thing
          </Text>
        </Box>
      </Flex>

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
  );
}
