// ReactPortal.js
import React from "react";
import { Portal, Box, Button } from "@chakra-ui/react";
import { useModal } from "../app/contexts/ModalContext";
// import { useModal } from "./ModalContext";

function ReactPortal() {
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
        display="flex"
        justifyContent="center"
        alignItems="center"
        background="rgba(0, 0, 0, 0.5)"
      >
        <Box p={4} background="white" borderRadius="md" boxShadow="md">
          {portalContent}
          <Button onClick={closePortal}>Close</Button>
        </Box>
      </Box>
    </Portal>
  );
}

export default ReactPortal;
