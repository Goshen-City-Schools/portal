import {
  FormLabel,
  Input,
  FormControl,
  Button,
  Select,
} from "@chakra-ui/react";
import { useClasses } from "../../hooks";
import { useState } from "react";

export default function ResultForm({ action, resultData }) {
  const [formData, setFormData] = useState({
    session: resultData.session || "",
    term: resultData.term || "",
    student: resultData.student || "",
    class: resultData.class || "",
  });

  const { schoolClasses } = useClasses(formData);
  const { subjectsData } = useSubjects();

  return (
    <form>
      {/* Session */}
      <FormControl>
        <FormLabel size={"sm"}>Session</FormLabel>
        <Select>
          <option value="">-- Select Session --</option>
          <option value="20232024">2023 - 2024</option>
        </Select>
      </FormControl>

      {/* Term */}
      <FormControl>
        <FormLabel size={"sm"}>Term</FormLabel>
        <Select>
          <option value="">-- Select Term --</option>
          <option value="term1">First Term</option>
          <option value="term2">Second Term</option>
          <option value="term3">Third Term</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Upload type</FormLabel>
        <Select>
          <option value="">-- Select result upload type --</option>
          <option value="byStudent">By Student</option>
          <option value="bySubject">By Subject</option>
          <option value="byClass">By Class</option>
        </Select>
      </FormControl>

      {/* Class */}
      <FormControl>
        <FormLabel size={"sm"}>Class</FormLabel>
        <Select>
          <option value="">-- Select Class --</option>
          {schoolClasses.map((SchoolClass) => (
            <option key={SchoolClass._id} value={SchoolClass._id}>
              {SchoolClass.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* SubClass */}
      <FormControl>
        <FormLabel size={"sm"}>Class</FormLabel>
        <Select>
          <option value="">-- Select Class --</option>
          {schoolClasses.map((SchoolClass) => (
            <option key={SchoolClass._id} value={SchoolClass._id}>
              {SchoolClass.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Subject */}
      <FormControl>
        <FormLabel size={"sm"}>Subject</FormLabel>
        <Select>
          <option value="">-- Select Subject --</option>
          {schoolClasses.map((SchoolClass) => (
            <option key={SchoolClass._id} value={SchoolClass._id}>
              {SchoolClass.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
