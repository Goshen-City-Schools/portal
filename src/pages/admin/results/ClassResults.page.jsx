import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import ResultSheet, { ResultSheetPDF } from "../../../components/ResultSheet";

import { Flex, Button, FormControl, Select } from "@chakra-ui/react";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import { MdAdd, MdFilter, MdPrint, MdUpdate } from "react-icons/md";
import { useParams } from "react-router-dom";
import { SearchWidget } from "../../../widgets";
import ClassResultTable from "../../../components/tables/results/ClassResultTable";
import AddResultPortal from "../../../portals/shared/AddResult.portal";
import { useModal } from "../../../app/contexts/ModalContext";
import { useSubjects } from "../../../hooks/Subjects";
import { useClasses } from "../../../hooks";

export default function ClassResultsPage() {
  const handlePrint = () => {
    window.print();
  };

  const { subjectsData } = useSubjects();
  const { schoolClasses } = useClasses();

  const { openPortal } = useModal();

  const { session, term, classId, type } = useParams();

  const resultsData = [
    {
      studentId: "",
      session: "20232024",
      term: "term1",
      results: [
        {
          subject: "mathematics",
          exam: 49,
          test1: 15,
          test2: "",
        },
        {
          subject: "english",
          exam: 49,
          test1: 15,
          test2: 0,
        },
        {
          subject: "physics",
          exam: 49,
          test1: 15,
          test2: 0,
        },
        {
          subject: "chemistry",
          exam: 49,
          test1: 15,
          test2: 0,
        },
      ],
    },
    {
      studentId: "",
      session: "20232024",
      term: "term1",
      results: [
        {
          subject: "mathematics",
          exam: 49,
          test1: 15,
          test2: "",
        },
        {
          subject: "english",
          exam: 49,
          test1: 15,
          test2: 0,
        },
        {
          subject: "physics",
          exam: 49,
          test1: 15,
          test2: 0,
        },
        {
          subject: "chemistry",
          exam: 49,
          test1: 15,
          test2: 0,
        },
      ],
    },
    {
      studentId: "",
      session: "20232024",
      term: "term1",
      results: [
        {
          subject: "mathematics",
          exam: 49,
          test1: 15,
          test2: "",
        },
        {
          subject: "english",
          exam: 49,
          test1: 15,
          test2: 0,
        },
        {
          subject: "physics",
          exam: 49,
          test1: 15,
          test2: 0,
        },
        {
          subject: "chemistry",
          exam: 49,
          test1: 15,
          test2: 0,
        },
      ],
    },
  ];

  // Create Results Data table specific for creating results

  // Be able to view Exam Score, test score for all.

  return (
    <PageWrapper overflowX={"scroll"}>
      <PageSectionHeader pageTitle={"Results"} pageCrumb={"Home / Results"} />

      <Flex
        gap={4}
        fontSize={"sm"}
        py={6}
        justifyContent={"flex-end"}
        classsubject="no-print"
      >
        <Button
          bg={"brand.700"}
          size={"sm"}
          color={"neutral.100"}
          onClick={handlePrint}
        >
          <IconComponent>
            <MdPrint />
          </IconComponent>
          Print Broadsheet
        </Button>

        <Button leftIcon={<MdFilter />} mx={0} size={"sm"} fontSize={"sm"} />
      </Flex>

      {/*  */}
      <Flex gap={4}>
        {/* Session Select */}
        <FormControl>
          <Select size={"sm"}>
            <option value={"20232024"}>-- Select Session --</option>
            <option value={"20232024"}>2023 -2024</option>
            <option value={"20232024"}>2023 -2024</option>
          </Select>
        </FormControl>

        {/* Term Select */}
        <FormControl>
          <Select size={"sm"}>
            <option value={"20232024"}>-- Select Term --</option>
            <option value={"20232024"}>First term</option>
            <option value={"20232024"}>Second term</option>
            <option value={"20232024"}>Third term</option>
          </Select>
        </FormControl>

        {/* Class Select */}
        <FormControl>
          <Select size={"sm"}>
            <option value={""}>-- Select Class --</option>
            {schoolClasses.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {schoolClass.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Subject Select */}
        <FormControl>
          <Select size={"sm"}>
            <option value={""}>-- Select Subject --</option>
            {subjectsData.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>

      {/* Search and More Widget */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Student"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            variant={"outline"}
            size={"sm"}
            colorScheme="facebook"
            onClick={() => {
              openPortal(<CreateEventPortal />);
            }}
          >
            <IconComponent>
              <MdUpdate />
            </IconComponent>
            Update Result
          </Button>

          {/* Add New */}
          <Button
            size={"sm"}
            colorScheme={"facebook"}
            onClick={() => {
              openPortal(<AddResultPortal />);
            }}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Result
          </Button>
        </Flex>
      </Flex>

      {/* Class Results Table */}
      <ClassResultTable />
    </PageWrapper>
  );
}
