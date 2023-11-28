import { useState } from "react";

import { FormControl, Input, FormLabel, Grid } from "@chakra-ui/react";

import ngStates from "../data/nigeria_states.json";

function StudentPersonalDetailsUpdateForm({ action, studentData }) {
  const {
    firstName,
    lastName,
    otherName,
    gender,
    dateOfBirth,
    stateOfOrigin,
    LGA,
  } = studentData;

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    otherName: otherName || "",
    gender: gender || "",
    dateOfBirth: dateOfBirth || "",
    stateOfOrigin: stateOfOrigin || "",
    LGA: LGA || "",
  });

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  const LGAs =
    ngStates.find((ngState) => ngState.alias === formData.stateOfOrigin)
      ?.lgas || [];

  return (
    <form>
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
        {/* First name */}
        <FormControl>
          <FormLabel>First name</FormLabel>
          <Input value={formData.firstName} onChange={handleInputChange} />
        </FormControl>

        {/* Surname */}
        <FormControl>
          <FormLabel>Surname</FormLabel>
          <Input value={formData.lastName} onChange={handleInputChange} />
        </FormControl>

        {/* Middle name */}
        <FormControl>
          <FormLabel>Middle name</FormLabel>
          <Input value={formData.middleName} onChange={handleInputChange} />
        </FormControl>

        {/* Gender */}
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Input value={formData.gender} onChange={handleInputChange} />
        </FormControl>

        {/* Date of Birth */}
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* State of Origin */}
        <FormControl>
          <FormLabel>State of Origin</FormLabel>
          <Select value={formData.stateOfOrigin} onChange={handleInputChange}>
            <option value="">-- Select State of Origin --</option>

            {ngStates.map((ngState) => (
              <option key={ngState.alias} value={ngState.alias}>
                {ngState.state}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Local Government Area */}
        <FormControl>
          <FormLabel>Local Government Area</FormLabel>
          <Select value={formData.LGA} onChange={handleInputChange}>
            <option value="">-- Local Government Area --</option>

            {LGAs.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </form>
  );
}

export default function StudentUpdateScreen() {
  return <div>StudentUpdateScreen</div>;
}
