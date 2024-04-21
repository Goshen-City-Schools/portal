import React from "react";
import { FormButton, FormInput, FormSelect, FormcContainer } from "../shared";
import { useState } from "react";
import { useUser } from "../../app/contexts/UserContext";
import { useFees } from "../../hooks";

export default function GenerateInvoiceForm({ action, invoiceData }) {
  const { user } = useUser();

  //   TODO: Get feetypes names
  const { fees } = useFees();

  console.log(fees);

  let studentId;

  //   TODO: handleInputChange Function

  if (user?.accountType === "student") {
    studentId = user.studentId;
  } else studentId = "";

  const [formData, setFormData] = useState({
    session: invoiceData?.session || "",
    term: invoiceData?.term || "",
    studentId: invoiceData?.studentId || studentId,
    feeType: invoiceData?.feeType || "",
    amount: invoiceData?.amount || "",
    paymentType: "",
  });

  if (formData.paymentType === "full") {
    setFormData({ ...formData, amount: 2000 });
  }

  return (
    <FormcContainer>
      {/* Session */}
      <FormSelect
        label={"Session"}
        name={"session"}
        data={[{ name: "2023 - 2024", value: "20232024" }]}
        data_item_name={"name"}
        data_item_value={"value"}
      />

      {/* Term */}
      <FormSelect
        label={"Term"}
        name={"term"}
        data={[
          { name: "First Term", value: "term1" },
          { name: "Second Term", value: "term2" },
          { name: "Third Term", value: "term3" },
        ]}
        data_item_name={"name"}
        data_item_value={"value"}
      />

      {/* Fee Type (adjust options) */}
      <FormSelect
        label={"Payment type"}
        name={"paymentType"}
        data={[
          { name: "Full Payment", value: "full" },
          { name: "Part Payment", value: "part" },
        ]}
        data_item_name={"name"}
        data_item_value={"value"}
      />

      {/* Payment Type */}
      <FormSelect
        label={"Payment type"}
        name={"paymentType"}
        data={[
          { name: "Full Payment", value: "full" },
          { name: "Part Payment", value: "part" },
        ]}
        data_item_name={"name"}
        data_item_value={"value"}
      />

      {/* Amount  */}
      <FormInput
        disabled={formData.paymentType === "full"}
        name={"amount"}
        data={formData}
        label={"Amount"}
      />

      {/* Submit Button */}
      <FormButton label={"Generate"} />
    </FormcContainer>
  );
}
