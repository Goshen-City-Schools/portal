// ReactPortal.js
import React from "react";
import { Portal, Box, Button } from "@chakra-ui/react";
import { useModal } from "../app/contexts/ModalContext";
import { MdOutlineCancel } from "react-icons/md";

function ReactPortal({ width }) {
  const { isOpen, closePortal, portalContent } = useModal();

  if (!isOpen) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="1000"
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        background="rgba(0, 0, 0, 0.5)"
      >
        <Box
          p={4}
          background="white"
          height={"max-content"}
          maxH={"100vh"}
          overflowY={"scroll"}
          borderRadius="md"
          boxShadow="md"
        >
          <Box
            maxWidth="full"
            minWidth={"sm"}
            width={{ base: "full", md: width ? width : "max-content" }}
          >
            {portalContent}
          </Box>
          <Button
            size={"sm"}
            colorScheme="red"
            variant={"outline"}
            leftIcon={<MdOutlineCancel />}
            onClick={closePortal}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Portal>
  );
}

export default ReactPortal;
