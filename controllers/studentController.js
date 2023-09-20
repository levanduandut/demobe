import { MAX_RECORDS } from "../Global/constants.js";
import HtttpStatusCode from "../exceptions/HttpStatusCode.js";
import { studentRepository } from "../repositories/index.js";

const getAllStudents = async (req, res) => {
  console.log(req.body);
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredStudent = await studentRepository.getAllStudents({
      page,
      size,
      searchString,
    });
    res.status(HtttpStatusCode.OK).json({
      message: "Get All Student OK",
      page,
      searchString,
      size: filteredStudent.length,
      data: filteredStudent,
    });
  } catch (error) {
    res.status(HtttpStatusCode.BAD_REQUEST).json({
      message: "Can not get Student",
    });
  }
};
const getStudentById = async (req, res) => {
  try {
    let student = await studentRepository.getDetailStudent(req.params.id);
    res.status(HtttpStatusCode.OK).json({
      message: "Get Student OK",
      data: student,
    });
  } catch (error) {
    res.status(HtttpStatusCode.BAD_REQUEST).json({
      message: "Can not get Student" + error,
    });
  }
};
const updateStudent = async (req, res) => {
  try {
    const { id, name, email, languages, gender, phone, address } = req.body;
    let student = await studentRepository.updateStudent(req.body);
    res.status(HtttpStatusCode.OK).json({
      message: "Get Student OK",
      data: student,
    });
  } catch (error) {
    res.status(HtttpStatusCode.BAD_REQUEST).json({
      message: "Can not get Student" + error,
    });
  }
};
const insertStudent = async (req, res) => {
  try {
    const student = await studentRepository.insertStudent(req.body);
    res.status(HtttpStatusCode.OK).json({
      message: "Successfully Inserted student",
      data: student,
    });
  } catch (error) {
    res.status(HtttpStatusCode.BAD_REQUEST).json({
      message: "Can not insert Student",
      validationErrors: error.validationErrors,
    });
  }
};
const gennerateStudents = async (req, res) => {
  let student = await studentRepository.gennerateStudents(req.body);
  res.status(HtttpStatusCode.OK).json({
    message: "Successfully 1000 Inserted student",
  });
};

export default {
  getAllStudents,
  getStudentById,
  insertStudent,
  updateStudent,
  gennerateStudents,
};
