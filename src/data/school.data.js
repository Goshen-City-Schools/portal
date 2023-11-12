const staffRoles = [
  {
    "id": "1",
    "name": "Principal",
    "description": "",
    "priviledges": ["All"],
    "staff": ["IT Principal"],
  },
  {
    "id": "2",
    "name": "IT Personnel",
    "description": "",
    "priviledges": [
      "Staffs",
      "Students",
      "Results",
      "Communication",
      "CBT",
      "Calendar",
    ],
  },
  {
    "id": "3",
    "name": "Bursar",
    "description": "",
    "priviledges": ["Students", "Finance", "e-Library"],
  },
  {
    "id": "4",
    "name": "Librarian",
    "description": "",
    "priviledges": ["Students", "Staff", "e-Library"],
  },
  {
    "id": "5",
    "name": "Class Teacher",
    "description": "",
    "priviledges": ["Students", "Classes", "e-Library"],
  },
  {
    "id": "6",
    "name": "Subject Teacher",
    "description": "",
    "priviledges": ["Students", "Classes", "Lesson Manager"],
  },
];

const schoolClasses = [
  {
    id: "1",
    name: "Reception",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "2",
    name: "Foundation",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "3",
    name: "Discovery 1",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "4",
    name: "Discovery 2",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "5",
    name: "Discovery 3",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "6",
    name: "Year 1",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "7",
    name: "Year 2",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "8",
    name: "Year 3",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "9",
    name: "Year 4",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "10",
    name: "Year 5",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "11",
    name: "JSS 1",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "12",
    name: "JSS 2",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "13",
    name: "JSS 3",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "14",
    name: "SSS 1",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "15",
    name: "SSS 2",
    allowSubClasses: true,
    subClasses: [],
  },
  {
    id: "16",
    name: "SSS 3",
    allowSubClasses: true,
    subClasses: ["kk"],
  },
];

export default { staffRoles, schoolClasses };
