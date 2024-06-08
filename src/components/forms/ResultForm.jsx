import { useClassDetails, useClasses } from "../../hooks";
import { useState } from "react";
import { FormInput, FormSelect, FormcContainer } from "../shared";

import { Stack } from "@chakra-ui/react";

import { Text, Button, Select } from "@chakra-ui/react";
import { useSubjects } from "../../hooks/Subjects";
import { MdChevronRight } from "react-icons/md";
import { useAcademicSessions, useAcademicTerms } from "../../hooks/Acadmics";
import getOrdinal from "../../helpers/getOrninals";

export default function ResultForm({ action, resultData }) {
  const [formData, setFormData] = useState({
    session: resultData?.session || "",
    term: resultData?.term || "",
    student: resultData?.student || "",
    class: resultData?.class || "",
    subject: resultData?.subject || "",
    resultFormat: resultData?.resultFormat || "",
    classSubjectResult:
      resultData?.classSubjectResult ||
      [
        // Populate with subjects for the class and a default value of zero for each cell, accourding to the result format.
      ],
  });

  const { sessions } = useAcademicSessions();
  const { terms } = useAcademicTerms();
  const { schoolClasses } = useClasses(formData);
  const { subjectsData } = useSubjects();
  const { classDetails } = useClassDetails(formData.class);

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  return (
    <FormcContainer classesParams={"max-w-[560px] mx-auto bg-transparent p-4"}>
      <Stack gap={6} mb={8}>
        {/* Session */}
        <div className="inputContainer">
          <label htmlFor="session">Session:</label>
          <Select
            name="session"
            id=""
            value={formData.session}
            onChange={handleInputChange}
          >
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.startYear} - {session.endYear}
              </option>
            ))}
          </Select>
        </div>
        {/* Term */}

        <div className="inputContainer">
          <label htmlFor="session">Term:</label>
          <Select
            name="term"
            id=""
            value={formData.term}
            onChange={handleInputChange}
          >
            {terms.map((term) => (
              <option key={term.id} value={term.id}>
                {getOrdinal(term.id)} Term
              </option>
            ))}
          </Select>
        </div>

        {/* Class */}
        <div className="inputContainer">
          <label htmlFor="session">Class:</label>
          <Select
            name="schoolClass"
            id="schoolClass"
            value={formData.schoolClass}
            onChange={handleInputChange}
          >
            {schoolClasses.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {schoolClass.schoolClass.name} {schoolClass.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Subject */}
        <FormSelect
          name={"subject"}
          label={"Subject"}
          data={subjectsData}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          handleChange={handleInputChange}
        />

        <Button
          ml={"auto"}
          size={"sm"}
          rightIcon={<MdChevronRight />}
          colorScheme={"facebook"}
        >
          Proceed{" "}
        </Button>
      </Stack>
    </FormcContainer>
  );
}
