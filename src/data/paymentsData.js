const pamentsData = [
  // User 1
  {
    userId: "", // To return user data
    accountType: "", // To ease search through on database
    sessionTermId: "", // to return academic session and term
    payments: [
      {
        name: "School Fees",
        value: "SCHF",
        amountPayable: 55600,
        amountPaid: 30000,
        balance: 25600,
      },
    ],
  },

  //   User 2
  {
    userId: "",
    accountType: "",
    sessionTermId: "",
    payments: [
      {
        name: "School Fees",
        value: "SCHF",
        amountPayable: 55600,
        amountPaid: 55600,
        balance: 0,
      },
      {
        name: "Bus Fees",
        value: "BUSF",
        amountPayable: 25000,
        amountPaid: 25000,
        balance: 0,
      },
      {
        name: "Hostel Fees",
        value: "HOSF",
        amountPayable: 125000,
        amountPaid: 5000,
        balance: 10000,
      },
    ],
  },
];
