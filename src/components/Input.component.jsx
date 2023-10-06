const Input = ({ label, ...inputProps }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm opacity-70 font-bold">{label}</label>}
      <input
        {...inputProps}
        className="w-full px-3 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker text-sm"
      />
    </div>
  );
};

export default Input;
