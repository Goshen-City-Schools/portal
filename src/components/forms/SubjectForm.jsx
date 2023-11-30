import { useState } from "react";
import { FormInput, FormcContainer } from "../shared";

export default function SubjectForm({ action, subjectData }) {
  const [formData, setFormData] = useState({
    name: subjectData?.name || "",
    classes: subjectData?.classes || "",
    departments: subjectData?.department || "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send data to backend
    return;
  };

  const handleInputChange = (e) => {
    return;
  };

  return (
    <FormcContainer handleFormSubmit={handleFormSubmit}>
      <FormInput
        name={"name"}
        data={formData}
        handleChange={handleInputChange}
      />

      {/* MultiSelect Classes */}
    </FormcContainer>
  );
}
