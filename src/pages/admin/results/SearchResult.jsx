import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import {
  FormButton,
  FormInput,
  FormSelect,
  FormcContainer,
} from "../../../components/shared";
import { useState } from "react";
import { useAcademicSessions, useAcademicTerms } from "../../../hooks/Acadmics";
import getOrdinal from "../../../helpers/getOrninals";
import { useClassDetails, useClasses } from "../../../hooks";
import { useSubjects } from "../../../hooks/Subjects";
import { useNavigate } from "react-router-dom";

function SearchResultPage() {
  const [formData, setFormData] = useState({
    session: "",
    term: "",
    schoolClass: "",
    subject: "",
  });
  const navigate = useNavigate();
  const { sessions } = useAcademicSessions();
  const { terms } = useAcademicTerms();
  const { schoolClasses } = useClasses();
  const { subjectsData } = useSubjects();

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));

    console.log(formData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/admin/results/${formData.schoolClass}?subject=${formData.subject}&&session=${formData.session}&&term=${formData.term}`
    );
  };

  return (
    <PageWrapper>
      <PageSectionHeader pageTitle={`Results`} pageCrumb={"Home / Results"} />
      <div className="w-full max-w-xl mx-auto mt-8 ">
        <h3 className="text-2xl font-bold">Search</h3>
        <p className="text-sm">Select the options below to search for result</p>

        <FormcContainer
          handleFormSubmit={handleSubmit}
          classesParams={"mt-6 max-w-lg p-4 bg-transparent"}
        >
          <div className="inputContainer">
            <label htmlFor="session">Session:</label>
            <select
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
            </select>
          </div>

          <div className="inputContainer">
            <label htmlFor="session">Term:</label>
            <select
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
            </select>
          </div>

          <div className="inputContainer">
            <label htmlFor="session">Class:</label>
            <select
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
            </select>
          </div>

          <div className="inputContainer">
            <label htmlFor="session">Subject:</label>
            <select
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
            >
              {subjectsData.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-auto ">
            <FormButton label={"Search"} />
          </div>
        </FormcContainer>
      </div>
    </PageWrapper>
  );
}

export default SearchResultPage;
