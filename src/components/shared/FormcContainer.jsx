export default function FormcContainer({
  handleFormSubmit,
  children,
  ...classesParams
}) {
  return (
    <form
      className={`rounded-lg px-8 bg-white text-sm py-6 flex-col flex gap-x-6 gap-y-8 ${classesParams}`}
      onSubmit={handleFormSubmit}
    >
      {children}
    </form>
  );
}
