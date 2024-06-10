import React, { useState } from "react";
import { FormcContainer } from "../../shared";
import { useSubjects } from "../../../hooks/Subjects";
import { FormLabel, Select, Input, Button, useToast } from "@chakra-ui/react";
import { useModal } from "../../../app/contexts/ModalContext";

function AddSubjectResultForm({ session, term, subjectId, classId }) {
  const { subjectsData } = useSubjects();
  const { closePortal } = useModal();

  const [subjectResultData, setSubjectResultData] = useState({
    session: session,
    term: term,
    studentId: "",
    classId: classId,
    subjectId: subjectId,
    test1: 0,
    test2: 0,
    exam: 0,
  });

  const toast = useToast();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    toast({
      title: "Result Uploaded",
      position: "top-right",
      status: "success",
      duration: 5000,
    });

    closePortal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const maxValues = {
      test1: 20,
      test2: 20,
      exam: 60,
    };

    const newValue = Math.min(Number(value), maxValues[name]);
    setSubjectResultData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <FormcContainer classesParams={"pb-8"} handleFormSubmit={handleFormSubmit}>
      {/* Subject select */}
      <div className="input-container">
        <FormLabel fontWeight={"600"} fontSize={"sm"}>
          Subject
        </FormLabel>
        <Select
          name="subjectId"
          value={subjectResultData.subjectId}
          onChange={handleInputChange}
        >
          <option value="">-- Select subject --</option>
          {subjectsData.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </Select>
      </div>

      {/* Test 1 score */}
      <div className="input-container">
        <FormLabel fontWeight={"600"} fontSize={"sm"}>
          Test 1 Score
        </FormLabel>
        <Input
          type="number"
          name="test1"
          min={0}
          max={20}
          value={subjectResultData.test1}
          onChange={handleInputChange}
        />
      </div>

      {/* Test 2 score */}
      <div className="input-container">
        <FormLabel fontWeight={"600"} fontSize={"sm"}>
          Test 2 Score
        </FormLabel>
        <Input
          type="number"
          name="test2"
          min={0}
          max={20}
          value={subjectResultData.test2}
          onChange={handleInputChange}
        />
      </div>

      {/* Exam score */}
      <div className="input-container">
        <FormLabel fontWeight={"600"} fontSize={"sm"}>
          Exam Score
        </FormLabel>
        <Input
          type="number"
          name="exam"
          min={0}
          max={100}
          value={subjectResultData.exam}
          onChange={handleInputChange}
        />
      </div>

      <Button type="submit" colorScheme="blue">
        Upload Result
      </Button>
    </FormcContainer>
  );
}

export default AddSubjectResultForm;
