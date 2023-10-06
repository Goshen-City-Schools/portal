// import { FiSearch } from 'react-icons/fi';
import Button from '../components/Button.component';

const SearchWidget = ({ text }) => {
  return (
    <div className="w-full max-w-sm flex items-center gap-0.5 pl-3 bg-gray-300 rounded-lg">
      <div className="mr-3">{/* <FiSearch /> */}</div>

      <input
        type="search"
        name=""
        id=""
        placeholder={text}
        className="bg-transparent w-full flex-1 placeholder:text-sm text-sm"
      />
      <Button
        variant="secondary"
        text="Search"
        className="mt-0 rounded-lg py-2  font-bold text-sm px-6 bg-gray-700 text-white "
      />
    </div>
  );
};

export default SearchWidget;
