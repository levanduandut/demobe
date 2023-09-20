import Exception from "../exceptions/Exception.js";
import { Student } from "../models/index.js";
import { faker } from "@faker-js/faker";

const getAllStudents = async ({ page, size, searchString }) => {
  page = parseInt(page);
  size = parseInt(size);
  debugger;
  let filteredStudent = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
        ],
      },
    },
    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  debugger;
  return filteredStudent;
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phone,
  address,
}) => {
  try {
    debugger;
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phone,
      address,
    });
    return student;
  } catch (error) {
    debugger;
    throw new Exception("Input error: ", error.errors);
    debugger;
  }
};

const getDetailStudent = async (studentId) => {
  // let id = parseInt(studentId);
  let student = await Student.findById(studentId);
  if (!student) {
    throw new Exception("Student not found");
  }
  return student;
};
const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phone,
  address,
}) => {
  let student = await Student.findById(id);
  student.name = name ?? student.name;
  student.email = email ?? student.email;
  student.languages = languages ?? student.languages;
  student.gender = gender ?? student.gender;
  student.phone = phone ?? student.phone;
  student.address = address ?? student.address;
  await student.save();
  return student;
};

const gennerateStudents = async () => {
  let students = [];
  for (let i = 0; i < 1000; i++) {
    let fakeStudent = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      languages: [
        faker.helpers.arrayElement(["english", "spanish"]),
        faker.helpers.arrayElement(["chinese", "japanese"]),
      ],
      address: faker.location.streetAddress(),
      gender: faker.helpers.arrayElement(["male", "female"]),
    };
    students.push(fakeStudent);
  }
  debugger;
  Student.insertMany(students);
  debugger;
};
export default {
  getAllStudents,
  insertStudent,
  gennerateStudents,
  getDetailStudent,
  updateStudent,
};
