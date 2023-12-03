export default function FormcContainer({
  handleFormSubmit,
  children,
  classesParams,
}) {
  return (
    <form
      className={`rounded-lg  bg-white text-sm w-full flex-col flex gap-x-6 gap-y-8 ${classesParams}`}
      onSubmit={handleFormSubmit}
    >
      {children}
    </form>
  );
}
