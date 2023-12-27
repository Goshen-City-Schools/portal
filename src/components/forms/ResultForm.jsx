import { useClassDetails, useClasses } from "../../hooks";
import { useState } from "react";
import { FormInput, FormSelect, FormcContainer } from "../shared";

import { Stack } from "@chakra-ui/react";

import { Text, Button } from "@chakra-ui/react";
import { useSubjects } from "../../hooks/Subjects";
import { MdChevronRight } from "react-icons/md";

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

  const { schoolClasses } = useClasses(formData);
  const { subjectsData } = useSubjects();
  const { classDetails } = useClassDetails(formData.class);

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  return (
    <form>
      <Stack gap={6} mb={8}>
        {/* Session */}
        <FormSelect
          data={[{ name: "2023 - 2024", value: "20232024" }]}
          label={"Session"}
          name={"session"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"value"}
          handleChange={handleInputChange}
        />

        {/* Term */}
        <FormSelect
          data={[
            { name: "First term", value: "term1" },
            { name: "Second term", value: "term2" },
            { name: "Third term", value: "term3" },
          ]}
          label={"Term"}
          name={"term"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"value"}
          handleChange={handleInputChange}
        />

        {/* Class */}
        <FormSelect
          data={schoolClasses}
          label={"Class"}
          name={"class"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"_id"}
          handleChange={handleInputChange}
        />

        {/* SubClass */}
        <FormSelect
          name={"subClass"}
          label={"Sub Class"}
          data={classDetails?.subClasses}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          handleChange={handleInputChange}
        />

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

        {/* Result format */}
        <FormSelect
          name={"resltFormat"}
          label={"Result Format"}
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
    </form>
  );
}
