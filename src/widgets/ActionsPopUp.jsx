import {
  PopoverTrigger,
  PopoverContent,
  Popover,
  PopoverCloseButton,
  PopoverBody,
  PopoverArrow,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import TuitionFeeForm from "../components/forms/fees/TuitionFeeForm";
import { useModal } from "../app/contexts/ModalContext";

const ActionsPopUp = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false); // Add state for popover

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          ml={0}
          pr={1}
          size={"sm"}
          py={0.2}
          leftIcon={<FaEllipsisH />}
          onClick={() => setIsOpen(!isOpen)} // Toggle popover on button click
        ></Button>
      </PopoverTrigger>

      <PopoverContent w={"max-content"}>
        <PopoverArrow />
        <PopoverCloseButton onClick={handleClose} />

        <PopoverBody
          w={"max-content"}
          display={"flex"}
          flexDirection={"column"}
          mt={6}
          gap={4}
        >
          {menu.map((menuItem) => (
            <Button
              display={"flex"}
              justifyContent={"flex-start"}
              key={menu.name}
              ml={0}
              size={"sm"}
              py={0.2}
              leftIcon={menuItem.icon}
              colorScheme="facebook"
              variant={"outline"}
              onClick={() => {
                menuItem.onClick(); // Call the onClick function here
                handleClose();
              }}
            >
              {menuItem.label}
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ActionsPopUp;
