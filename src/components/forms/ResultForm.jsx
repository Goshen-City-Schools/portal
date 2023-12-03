import { useClassDetails, useClasses } from "../../hooks";
import { useState } from "react";
import { FormInput, FormcContainer } from "../shared";

import { Text } from "@chakra-ui/react";

export function NewClassSubjectResultSetupForm({ action, resultData }) {
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
        label={"resultFormat"}
        data={subjectsData}
        data_item_name={"name"}
        data_item_value={"_id"}
        formData={formData}
        handleChange={handleInputChange}
      />
    </form>
  );
}

export default function ResultForm() {
  // update the subject results to the subjects data

  //    already, every class have a set of subjects assigned, this classes are populated with a default value of zero for each column cell of the reslt data format.
  const [formData, setFormData] = useState({
    classSubjectResultId: "",
    classSubjectResult: [],
  });

  const subjectsData = [];

  function handleInputChange() {}

  return (
    // Use table than formContainer and make content editable or into Input component when the edit action is active.
    <FormcContainer>
      {/*  Student ___ subjectName subject result  */}
      <FormSelect
        data={subjectsData}
        label={"Subject"}
        name={"subject"}
        formData={formData}
        data_item_name={"name"}
        data_item_value={"value"}
        handleChange={handleInputChange}
      />

      <Text contentEditable></Text>

      <FormInput
        type="number"
        name={"continousAssessment"}
        label={"Continous Assessment"}
        handleChange={handleInputChange}
        data={formData}
      />

      <FormInput
        type="number"
        name={"examination"}
        label={"Examination"}
        handleChange={handleInputChange}
        data={formData}
      />

      <FormInput
        type="text"
        name={"total"}
        label={"Total"}
        handleChange={handleInputChange}
        data={formData}
        disabled={true}
      />

      <FormInput
        type="text"
        name={"totalGrade"}
        label={"Grade"}
        handleChange={handleInputChange}
        data={formData}
        disabled={true}
      />

      <FormInput
        type="text"
        name={"totalRemark"}
        label={"Remark"}
        handleChange={handleInputChange}
        data={formData}
        disabled={true}
      />
    </FormcContainer>
  );
}
