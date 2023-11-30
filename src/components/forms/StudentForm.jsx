import { useClassDetails, useClasses } from "../../hooks";
import { FormButton } from "../shared";

const StudentForm = ({ studentData }) => {
  const { schoolClasses } = useClasses();

  const {
    firstName,
    lastName,
    otherName,
    gender,
    dateOfBirth,
    stateOfOrigin,
    LGA,
    studentType,
    schoolClass,
    subClass,
    bloodGroup,
    genoType,
    contactAddress,
    guardians,
  } = studentData;

  //TODO: Optimize formData search for empty array
  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    otherName: otherName || "",
    gender: gender || "",
    dateOfBirth: dateOfBirth || "",
    stateOfOrigin: stateOfOrigin || "",
    studentType: studentType || "",
    schoolClass: schoolClass || "",
    subClass: subClass || "",
    bloodGroup: bloodGroup || "",
    genoType: genoType || "",
    contactAddress: contactAddress || "",
    guardians: guardians || "",
    LGA: LGA || "",
  });

  const { classDetails } = useClassDetails(schoolClass);

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  const LGAs =
    ngStates.find((ngState) => ngState.alias === formData.stateOfOrigin)
      ?.lgas || [];

  return (
    <FormcContainer>
      {/* Avatar Upload, Active on Edit Mode */}
      {action === "edit" && (
        <AvatarUpload
          formData={formData}
          imgUrl={"avatarImageURL"}
          thisUser={studentData}
        />
      )}
      {/* Firstname & Lastname */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormInput
          name={"firstName"}
          label={"First name"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          name={"lastName"}
          label={"Last name"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>
      {/* Middle name, Gender & Date of Birth */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <FormInput
          name={"middleName"}
          label={"Middle name"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          name={"gender"}
          label={"Gender"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          name={"dateOfBirth"}
          type="date"
          label={"Date of Birth"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>
      {/* Blood Group & Genotype */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          data={[
            { name: "A+", value: "a+" },
            { name: "A-", value: "a-" },
            { name: "O+", value: "o+" },
          ]}
          label={"Blood Group"}
          name={"bloodGroup"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"value"}
          handleChange={handleInputChange}
        />

        <FormSelect
          data={[
            { name: "AA", value: "aa" },
            { name: "AS", value: "as" },
            { name: "ss", value: "ss" },
          ]}
          label={"Genotype"}
          name={"genoType"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"value"}
          handleChange={handleInputChange}
        />
      </Grid>
      {/* Student Type, Class and Sub Class */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <FormSelect
          name={"studentType"}
          label={"Student Type"}
          data={[
            { name: "New", value: "new" },
            { name: "Existing", value: "existing" },
          ]}
          data_item_name={"name"}
          data_item_value={"value"}
          formData={formData}
          action={action}
          handleChange={handleInputChange}
        />

        <FormSelect
          name={"schoolClass"}
          label={"Class"}
          data={schoolClasses}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          action={action}
          handleChange={handleInputChange}
        />

        <FormSelect
          name={"subClass"}
          label={"Sub Class"}
          data={classDetails?.subClasses}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          action={action}
          handleChange={handleInputChange}
        />
      </Grid>
      {/* Contact Address */}
      <FormTextArea
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
      />
      {/* State of Origin & LGA */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          data={ngStates}
          label={"State of Origin"}
          name={"stateOfOrigin"}
          formData={formData}
          data_item_name={"state"}
          data_item_value={"alias"}
          handleChange={handleInputChange}
        />

        <FormSelect
          data={LGAs}
          label={"Local Government Area"}
          name={"LGA"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"alias"}
          handleChange={handleInputChange}
        />
      </Grid>
      // TODO: List all Guardians that a guardian can be select and reltionship
      to the Guardian
      <fieldset>
        <FormSelect
          data={LGAs}
          label={"Local Government Area"}
          name={"LGA"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"alias"}
          handleChange={handleInputChange}
        />
      </fieldset>
      <FormButton label={"Create Student Account"} />
    </FormcContainer>
  );
};

export default StudentForm;
