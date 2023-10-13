// import { FiSearch } from 'react-icons/fi';
import Button from "../components/Button.component";

import { RiSearchLine } from "react-icons/ri";

import { Input } from "@chakra-ui/react";

const SearchWidget = ({ text }) => {
  return (
    <div className="w-full searchInput max-w-sm flex items-center gap-0.5 h-12 pl-3 bg-gray-300 rounded-lg">
      <div className="mr-3">
        <RiSearchLine />
      </div>

      <Input
        border={"none"}
        px={0}
        focusBorderColor="transparent"
        outline={"none"}
        type="search"
        name=""
        id=""
        placeholder={text}
        className="bg-transparent w-full flex-1 placeholder:text-sm text-sm"
      />
      <Button
        variant="secondary"
        text="Search"
        className="mt-0 rounded-lg py-2  font-bold text-sm px-6 h-full bg-gray-700 text-white "
      />
    </div>
  );
};

export default SearchWidget;
