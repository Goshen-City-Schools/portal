function useTransactions() {
  return <div>useTransactions</div>;
}

// transaction ID is equivalent to invoice ID this means transactions is searched by invoiceID

// This is so because only one updatable transactionRecord exists for an invoice

// When transactionData is being returned, invoice object is destructured for use

function useTransaction(transactionId) {
  return <div>useTransactions</div>;
}

export { useTransaction, useTransactions };
