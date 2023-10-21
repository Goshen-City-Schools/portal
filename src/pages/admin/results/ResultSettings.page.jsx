import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import {
  Box,
  FormControl,
  FormLabel,
  Switch,
  Button,
  Textarea,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ResultSettingsPage() {
  const [showClassComment, setShowClassComment] = useState(false);
  const [showHeadComment, setShowHeadComment] = useState(false);
  const [classComment, setClassComment] = useState("");
  const [headComment, setHeadComment] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState("");

  const [gradingOptions, setGradingOptions] = useState({
    A: 90,
    B: 80,
    C: 70,
    D: 60,
    F: 0,
  });

  const [newGrade, setNewGrade] = useState("");
  const [newGradeValue, setNewGradeValue] = useState("");

  const [isModified, setIsModified] = useState(false);
  // Function to handle the submit button for comments
  const handleCommentSubmit = () => {
    // You can handle the submission logic here
  };
  const handleSave = () => {
    // Save the grading system options to your application's state or backend
    // For this example, we'll just log the gradingOptions
    console.log("Grading System Options:", gradingOptions);
    setIsModified(false);
  };

  const handleAddNewGrade = () => {
    if (newGrade && newGradeValue && !gradingOptions[newGrade]) {
      setGradingOptions({
        ...gradingOptions,
        [newGrade]: parseInt(newGradeValue),
      });
      setNewGrade("");
      setNewGradeValue("");
      setIsModified(true);
    }
  };

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Result Sheet Settings"}
        pageCrumb={"Home / Results / Settings"}
      />

      <Box>
        <FormControl display="flex" alignItems="center">
          <FormLabel>Class Teacher's Comment</FormLabel>
          <Switch
            isChecked={showClassComment}
            onChange={() => setShowClassComment(!showClassComment)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel>Head Teacher's Comment</FormLabel>
          <Switch
            isChecked={showHeadComment}
            onChange={() => setShowHeadComment(!showHeadComment)}
          />
        </FormControl>

        {showClassComment && (
          <FormControl mt={6}>
            <FormLabel>Class Teacher's Comment</FormLabel>
            <Textarea
              value={classComment}
              onChange={(e) => setClassComment(e.target.value)}
              placeholder="Enter Class Teacher's Comment"
            />
          </FormControl>
        )}

        {showHeadComment && (
          <FormControl mt={6}>
            <FormLabel>Head Teacher's Comment</FormLabel>
            <Textarea
              value={headComment}
              onChange={(e) => setHeadComment(e.target.value)}
              placeholder="Enter Head Teacher's Comment"
            />
          </FormControl>
        )}

        {showHeadComment || showClassComment ? (
          <Button colorScheme="teal" mt={6} onClick={handleCommentSubmit}>
            Submit Comments
          </Button>
        ) : (
          ""
        )}
        <Box mt={6}>
          <Text as={"h3"} mb={4}>
            Grade Settings
          </Text>
          <FormControl>
            <FormLabel>Select Assessment Type</FormLabel>
            <Select
              placeholder="Select Assessment Type"
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
            >
              <option value="examination">Examination</option>
              <option value="assessmentTest">Assessment Test</option>
              {/* Add more assessment types as needed */}
            </Select>
          </FormControl>

          {selectedAssessment && (
            <FormControl mt={6}>
              <FormLabel>Grading System for {selectedAssessment}</FormLabel>
              {Object.keys(gradingOptions).map((grade) => (
                <div key={grade}>
                  <FormLabel>{grade}</FormLabel>
                  <Input
                    type="number"
                    value={gradingOptions[grade]}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      if (
                        !isNaN(newValue) &&
                        newValue !== gradingOptions[grade]
                      ) {
                        setIsModified(true);
                      }
                      setGradingOptions({
                        ...gradingOptions,
                        [grade]: newValue,
                      });
                    }}
                  />
                </div>
              ))}
            </FormControl>
          )}

          <Button
            colorScheme="teal"
            mt={4}
            onClick={handleSave}
            isDisabled={!isModified}
          >
            Save
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  );
}
