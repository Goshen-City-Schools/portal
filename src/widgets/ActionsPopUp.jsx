import {
  PopoverTrigger,
  PopoverContent,
  Popover,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";

const ActionsPopUp = ({ menu }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          ml={0}
          pr={1}
          size={"sm"}
          py={0.2}
          leftIcon={<FaEllipsisH />}
        ></Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverBody>
          {menu.map((menuItem) => (
            <Button
              key={menu.name}
              ml={0}
              pr={1}
              size={"sm"}
              py={0.2}
              leftIcon={menuItem.icon}
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
