export function handleInputChange(e, setFormData) {
  const { name, value, checked, type } = e.target;
  const newValue = type === "checkbox" ? checked : value;
  setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
}
