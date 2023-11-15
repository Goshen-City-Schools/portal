import React from "react";

import { Button, Input } from "@chakra-ui/react";
import { MdPictureInPictureAlt } from "react-icons/md";
import { useRef } from "react";

export default function UpdateAvatarButton() {
  const ref = useRef();

  const handleClick = (e) => {
    ref.current.click();
  };
  return (
    <>
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
      <Input ref={ref} type="file" display={"none"} />
    </>
  );
}
