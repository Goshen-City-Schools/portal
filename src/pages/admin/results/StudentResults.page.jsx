import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import ResultSheet from "../../../components/ResultSheet";

import {
  Flex,
  Button,
  Text,
  FormControl,
  Select,
  Input,
} from "@chakra-ui/react";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import { MdDownload, MdFileUpload, MdPrint } from "react-icons/md";
import { useParams } from "react-router-dom";
import ClassResultTable from "../../../components/tables/results/ClassResultTable";
import { useResults } from "../../../hooks/Results";
import { useAcademicSessions, useAcademicTerms } from "../../../hooks/Acadmics";
import { useSubjects } from "../../../hooks/Subjects";
import { useClasses, useStudent } from "../../../hooks";
import getOrdinal from "../../../helpers/getOrninals";
import StudentResultTable from "../../../components/tables/results/StudentResultTable";

export default function StudentResultsPage() {
  const handlePrint = () => {
    window.print();
  };

  const { studentId, schoolClass } = useParams();

  const { studentData, loading } = useStudent(studentId);

  console.log(schoolClass, studentId, studentData);

  const [session, setSession] = React.useState("4");
  const [term, setTerm] = React.useState("3");
  const [classId, setClassId] = React.useState("29");
  const [subjectId, setSubjectId] = React.useState(null);
  // const [studentId, setStudentId] = React.useState(null);

  const { sessions } = useAcademicSessions();
  const { terms } = useAcademicTerms();
  const { schoolClasses } = useClasses();
  const { subjectsData } = useSubjects();

  const { resultData, error } = useResults(
    session,
    term,
    classId,
    subjectId,
    studentId
  );

  if (!studentData) return;

  return (
    <PageWrapper overflowX={"scroll"}>
      <div className="no-print">
        <PageSectionHeader
          pageTitle={`${studentData?.first_name} ${studentData?.last_name} Result`}
          pageCrumb={`Home / Results / ${studentData?.first_name} ${studentData?.last_name}`}
        />
      </div>

      <Flex gap={4} my={8}>
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
            bg={"accent.700"}
            color={"neutral.100"}
            gap={2}
            onClick={handlePrint}
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
              <MdDownload size={20} />
            </IconComponent>
            Download
          </Button>

          <Button
            bg={"brand.700"}
            color={"neutral.100"}
            gap={2}
            rounded={"sm"}
            border={"1px solid"}
            borderColor={"transparent"}
            // onClick={() => openPortal(<AddClassResultPortal />)}
            _hover={{
              bg: "transparent",
              color: "brand.700",
              borderColor: "brand.700",
            }}
          >
            <IconComponent>
              <MdPrint size={20} />
            </IconComponent>
            Print Result
          </Button>
        </div>
      </Flex>

      <div className="py-8">
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          resultData && <StudentResultTable data={resultData} />
        )}
      </div>
    </PageWrapper>
  );
}
