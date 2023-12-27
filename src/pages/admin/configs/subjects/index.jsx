import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";

import { Flex, Button, Box } from "@chakra-ui/react";
import IconComponent from "../../../../components/Icon.component";
import { MdAdd } from "react-icons/md";
import SearchWidget from "../../../../widgets/Search.widget";

import allowedUserRoles from "../../../../helpers/allowedUserRoles";
import { useUser } from "../../../../app/contexts/UserContext";
import SubjectTable from "../../../../components/tables/SubjectTable.component";
import { useNavigate } from "react-router-dom";

export default function SubjectsPage() {
  const navigate = useNavigate();

  const { user } = useUser();
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Manage Subjects"}
        pageCrumb={"Home / Subjects"}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Subject"} />

        {allowedUserRoles(user, [
          "IT Personnel",
          "Class Teacher",
          "Subject Teacher",
        ]) && (
          <Flex gap={4} fontSize={"sm"}>
            <Button
              bg={"brand.700"}
              size={"sm"}
              color={"neutral.100"}
              onClick={() => navigate("/admin/subjects/new")}
            >
              <IconComponent>
                <MdAdd />
              </IconComponent>
              Add Subject
            </Button>
          </Flex>
        )}
      </Flex>

      <Box>
        <SubjectTable />
      </Box>
    </PageWrapper>
  );
}
