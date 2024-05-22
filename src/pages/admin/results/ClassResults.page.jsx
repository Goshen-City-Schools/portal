import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import {
  Flex,
  Button,
  FormControl,
  Select,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import { MdPrint, MdFilter } from "react-icons/md";
import ClassResultTable from "../../../components/tables/results/ClassResultTable";
import { useModal } from "../../../app/contexts/ModalContext";
import { useClasses } from "../../../hooks";
import { useResults } from "../../../hooks/Results";
import { useAcademicSessions, useAcademicTerms } from "../../../hooks/Acadmics";
import getOrdinal from "../../../helpers/getOrninals";

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

  const { resultData, loading, error } = useResults(
    session,
    term,
    classId,
    subjectId,
    studentId
  );

  const { schoolClasses } = useClasses();

  const { openPortal } = useModal();

  return (
    <PageWrapper overflowX={"scroll"}>
      <PageSectionHeader pageTitle={"Results"} pageCrumb={"Home / Results"} />

      <Flex
        gap={4}
        fontSize={"sm"}
        py={6}
        justifyContent={"flex-end"}
        className="no-print"
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

      <Flex gap={4}>
        {/* Class Select */}
        <FormControl>
          <FormLabel className="!text-sm !font-bold">Class:</FormLabel>
          <Select
            size={"sm"}
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

        {/* Session Select */}
        <FormControl>
          <FormLabel className="!text-sm !font-bold">Session</FormLabel>
          <Select
            size={"sm"}
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            <option value={""}>-- Select Session --</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.startYear} - {session.endYear}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Term Select */}
        <FormControl>
          <FormLabel className="!text-sm !font-bold">Term:</FormLabel>
          <Select
            size={"sm"}
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
      </Flex>

      <div className="py-8">
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <ClassResultTable data={resultData} />
        )}
      </div>
    </PageWrapper>
  );
}
