const getOrdinal = (number) => {
  if (number === 0) return "zero"; // Special case for zero
  if (number < 0) return ""; // Handling negative numbers

  const formatter = new Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
  });
  const formattedNumber = formatter.format(number);

  // Appending ordinal suffix based on the last digit of the formatted number
  const suffix =
    number % 10 === 1 && number % 100 !== 11
      ? "st"
      : number % 10 === 2 && number % 100 !== 12
      ? "nd"
      : number % 10 === 3 && number % 100 !== 13
      ? "rd"
      : "th";

  return `${formattedNumber}${suffix}`;
};

export default getOrdinal;
