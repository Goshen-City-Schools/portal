import React, { useRef } from "react";
import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import { MdPictureInPictureAlt } from "react-icons/md";
import { useUser } from "../../app/contexts/UserContext";

import axios from "../../api/axios";
import { useState } from "react";

export default function UpdateAvatarButton({
  selectedFile,
  setSelectedFile,
  theUser,
}) {
  const fileInputRef = useRef();
  const toast = useToast();
  const { user, setInfoIsUpdated } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    try {
      setIsLoading(false);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        const dataURL = reader.result;

        const response = await axios.post(
          "/api/v1/upload-avatar",
          JSON.stringify({
            dataURL: dataURL,
            accountType: theUser.accountType,
            firstName: theUser.firstName,
            lastName: theUser.lastName,
            portalId: theUser.portalId,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setSelectedFile(null);
          setIsLoading(false);
          // Handle success, e.g., update UI or show a success message
          toast({
            title: "Profile Image Upload Successful",
            position: "top-right",
            status: "success",
            duration: 5000,
          });

          if (theUser.portalId === user.portalId) setInfoIsUpdated(true);
        } else {
          setSelectedFile(null);
          setIsLoading(false);

          const errorData = response.data;
          console.error("Image upload failed:", errorData.message);
          setSelectedFile(null);

          // Handle failure, e.g., display an error message
          toast({
            title: "Profile Image Upload Failed",
            description: errorData.message || "Unknown error",
            position: "top-right",
            status: "error",
            duration: 5000,
          });
        }
      };
    } catch (error) {
      console.error("Error handling file:", error.message);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <VStack pt={4}>
        <Button
          onClick={handleClick}
          rightIcon={<MdPictureInPictureAlt />}
          display={"flex"}
          w={"max-full"}
          colorScheme="purple"
          variant={"outline"}
          size={"sm"}
        >
          Update avatar
        </Button>
        {selectedFile && (
          <Button
            onClick={handleUpload}
            rightIcon={<MdPictureInPictureAlt />}
            display={"flex"}
            w={"max-full"}
            colorScheme="facebook"
            size={"sm"}
            isLoading={isLoading}
          >
            Upload Image
          </Button>
        )}
      </VStack>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </>
  );
}
