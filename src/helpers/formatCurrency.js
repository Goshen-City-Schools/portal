function formatCurrency(amount, currencyCode = "NGN") {
  // Ensure that the amount is a number
  if (isNaN(amount)) {
    throw new Error("Invalid input. Please provide a valid number.");
  }

  // Create a number formatter based on the user's locale
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  });

  // Format the amount as currency
  const formattedAmount = formatter.format(amount);

  return formattedAmount;
}

export default formatCurrency;
