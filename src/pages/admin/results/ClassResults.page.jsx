import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import {
  Flex,
  Button,
  FormControl,
  Select,
  Input,
  Text,
} from "@chakra-ui/react";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import { MdPrint, MdFileUpload, MdDownload } from "react-icons/md";
import ClassResultTable from "../../../components/tables/results/ClassResultTable";
import { useModal } from "../../../app/contexts/ModalContext";
import { useClasses } from "../../../hooks";
import { useResults } from "../../../hooks/Results";
import { useAcademicSessions, useAcademicTerms } from "../../../hooks/Acadmics";
import getOrdinal from "../../../helpers/getOrninals";
import { useSubjects } from "../../../hooks/Subjects";
import AddClassResultPortal from "../../../portals/results/AddClassResult.portal";
import PrintHeader from "../../../components/Header/PrintHeader";

export default function ClassResultsPage() {
  const handlePrint = () => {
    window.print();
  };

  const [session, setSession] = React.useState("4");
  const [term, setTerm] = React.useState("3");
  const [classId, setClassId] = React.useState("29");
  const [subjectId, setSubjectId] = React.useState(null);
  const [studentId, setStudentId] = React.useState(null);

  const { sessions } = useAcademicSessions();
  const { terms } = useAcademicTerms();
  const { subjectsData } = useSubjects();

  const { resultData, loading, error } = useResults(
    session,
    term,
    classId,
    subjectId,
    studentId
  );

  const { schoolClasses } = useClasses();

  const { openPortal } = useModal();

  if (!resultData) return;

  return (
    <PageWrapper overflowX={"scroll"}>
      <PageSectionHeader pageTitle={"Results"} pageCrumb={"Home / Results"} />

      <Flex gap={4} my={8} className=" no-print ">
        {/* Session Select */}
        <FormControl>
          <Select
            bg={"white"}
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            <option value={""}>-- Select Session --</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.startYear} / {session.endYear} Session
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Term Select */}
        <FormControl>
          <Select
            bg={"white"}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value={""}>-- Select Term --</option>
            {terms.map((term) => (
              <option key={term.id} value={term.id}>
                {`${getOrdinal(term.term)} Term `}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Class Select */}
        <FormControl>
          <Select
            bg={"white"}
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value={""}>-- Select Class --</option>
            {schoolClasses.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {schoolClass.schoolClass?.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Subject Select */}
        <FormControl>
          <Select
            bg={"white"}
            value={subjectId}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value={""}>-- Select Subject --</option>
            {subjectsData.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>

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
            bg={"neutral.100"}
            color={"brand.700"}
            gap={3}
            onClick={handlePrint}
            rounded={"sm"}
            border={"1px solid"}
            borderColor={"brand.700"}
          >
            <IconComponent>
              <MdDownload size={20} />
            </IconComponent>
            Download
          </Button>

          <Button
            bg={"accent.700"}
            color={"neutral.100"}
            gap={2}
            rounded={"sm"}
            border={"1px solid"}
            borderColor={"transparent"}
            _hover={{
              bg: "transparent",
              color: "accent.700",
              borderColor: "accent.700",
            }}
          >
            <IconComponent>
              <MdFileUpload size={20} />
            </IconComponent>
            Bulk Upload Result
          </Button>

          <Button
            bg={"brand.700"}
            color={"neutral.100"}
            gap={2}
            rounded={"sm"}
            border={"1px solid"}
            borderColor={"transparent"}
            onClick={() => openPortal(<AddClassResultPortal />)}
            _hover={{
              bg: "transparent",
              color: "brand.700",
              borderColor: "brand.700",
            }}
          >
            <IconComponent>
              <MdPrint size={20} />
            </IconComponent>
            Add New Result
          </Button>
        </div>
      </Flex>

      <div className="py-8">
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          resultData && (
            <>
              <PrintHeader />

              <Text
                as={"h2"}
                mx={"auto"}
                mb={8}
                textAlign={"center"}
                w={"max-content"}
                fontSize={"md"}
                fontWeight={"bold"}
                className="bg-blue-700 only-print mb-2 mt-2 text-white px-4 py-2 rounded-md"
              >
          SS 3 Hope Class Result Sheet
              </Text>

              <div className="only-print result-details flex border border-black  divide-x-2 divide-black justify-between gap-4 mt-4 mb-8">
                <div className="session p-2 w-full flex justify-center">
                  Session: 2023/2024
                </div>
                <div className="term p-2 w-full flex justify-center">
                  Term: First Term
                </div>
                <div className="session  p-2 w-full flex justify-center">
                  Subject: Mathematics
                </div>
              </div>

              <ClassResultTable data={resultData} />
            </>
          )
        )}
      </div>
    </PageWrapper>
  );
}
