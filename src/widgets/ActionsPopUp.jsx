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

const ActionsPopUp = ({ menu, row, deleteAction, viewAction }) => {
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
              colorScheme="blue"
              variant={"outline"}
              onClick={() => {
                if (menuItem.action === "delete") {
                  menuItem.name
                    .toLocaleLowerCase()
                    .includes(
                      "staff" || "student"
                        ? deleteAction(row.original.portalId)
                        : deleteAction(row.original._id)
                    );
                } else if (menuItem.action === "view") {
                  menuItem.name
                    .toLocaleLowerCase()
                    .includes("staff" || "student")
                    ? viewAction(row.original.portalId)
                    : viewAction(row.original._id);
                }

                handleClose(); // Close the popover
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
