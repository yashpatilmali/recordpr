const years = [
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
];
export const academicYears = Array.from(
  { length: 25 },
  (_, i) => `${2001 + i}`
);

const departments = [
  "Computer Engineering",
  "Information Technology",
  "AI & Data Science",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Robotics",
  "Data Science",
  "Cyber Security",
  "Mechatronics",
  "Automobile Engineering",
];

const courses = [
  "B.Tech",
  "M.Tech",
  "B.Sc IT",
  "BCA",
  "Diploma",
  "MCA",
  "B.E",
  "M.E",
  "B.Sc Computer Science",
  "B.Tech AI",
  "B.Tech DS",
];

function createCollege() {
  const courseObj = {};
  courses.forEach((c) => {
    courseObj[c] = { years, departments };
  });
  return { courses: courseObj };
}

function createUniversity(collegeNames) {
  const colleges = {};
  collegeNames.forEach((c) => {
    colleges[c] = createCollege();
  });
  return { colleges };
}

export const universities = {
  "Savitribai Phule Pune University": createUniversity([
    "COEP Tech University",
    "PCCOE Pune",
    "MIT WPU",
    "Sinhgad College",
    "Modern College",
  ]),
  "Mumbai University": createUniversity([
    "VJTI Mumbai",
    "Thadomal Shahani",
    "KJ Somaiya",
    "SPIT Mumbai",
  ]),
  "Anna University": createUniversity([
    "CEG Chennai",
    "MIT Chennai",
    "SRM University",
  ]),
  "JNTU Hyderabad": createUniversity([
    "JNTUH College of Engg",
    "Osmania University",
  ]),
  "Delhi University": createUniversity([
    "Hansraj College",
    "St Stephens",
    "Kirori Mal College",
  ]),
  "Nagpur University": createUniversity(["VNIT Nagpur", "JD College"]),
  "Gujarat Technological University": createUniversity([
    "DAIICT",
    "Nirma University",
  ]),
  "Karnataka University": createUniversity(["RV College", "BMS College"]),
  "Kerala University": createUniversity(["TKM College", "NSS College"]),
  "AICTE Approved Institutes": createUniversity([
    "Government Polytechnic Pune",
    "State Polytechnic",
  ]),
};
