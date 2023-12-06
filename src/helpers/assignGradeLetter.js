export default function assignGradeLetter(grade) {
  switch (grade) {
    case grade >= 70:
      return "A";
    case grade < 70 >= 60:
      return "B";
    case grade < 60 >= 50:
      return "C";
    case grade < 50 >= 45:
      return "D";
    default:
      return "F";
  }
}
