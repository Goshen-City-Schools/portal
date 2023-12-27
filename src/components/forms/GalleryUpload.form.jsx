import {
  FormLabel,
  Input,
  FormControl,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";

import { FaUpload } from "react-icons/fa";

export default function GalleryUploadForm() {
  return (
    <form action="">
      <FormControl>
        {/* File name */}
        <FormLabel>File Name</FormLabel>

        <Input name="name" placeholder="File name" />
      </FormControl>

      {/* File Category  */}
      <FormControl>
        <FormLabel>File Name</FormLabel>

        <Select name="category">
          <option value="">School Building</option>
          <option value="">School Facilities</option>
          <option value="">Students</option>
          <option value="">Staffs</option>
          <option value="">Others</option>
        </Select>
      </FormControl>

      <FormControl>
        {/* File description */}
        <FormLabel>File Description</FormLabel>

        <Textarea name="description" placeholder="File name" />
      </FormControl>

      <Button
        leftIcon={<FaUpload />}
        colorScheme="facebook"
        width={"max-content"}
        mx={"auto"}
        size={"sm"}
        fontSize={"sm"}
      >
        Upload to Gallery
      </Button>
    </form>
  );
}
