const users = [
  {
    id: 1,
    name: 'Mario',
    schoolID: 117,
  },
  {
    id: 2,
    name: 'Emilio',
    schoolID: 3359,
  },
];

const grades = [
  {
    id: 1,
    schoolID: 117,
    grade: 88,
  },
  {
    id: 2,
    schoolID: 3359,
    grade: 97,
  },
  {
    id: 3,
    schoolID: 117,
    grade: 85,
  },
  {
    id: 4,
    schoolID: 3359,
    grade: 90,
  },
];

const getUser = id => {
  return new Promise(resolve => {
    const user = users.find(user => user.id === id);
    if (user) resolve(user);
    else throw new Error(`Unable to find user with id of ${id}`);
  });
};

const getGrades = schoolID => {
  return new Promise(resolve => {
    resolve(grades.filter(grade => grade.schoolID === schoolID));
  });
};

const getStatus = async userID => {
  const user = await getUser(userID);
  const grades = await getGrades(user.schoolID);
  let average = 0;
  // Map array of grades (objects) to an array of grades (numbers),
  // then add up all the values in the array
  if (grades.length > 0) average = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  return `${user.name} has a ${average}% in the class.`;
};

getStatus(2)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
