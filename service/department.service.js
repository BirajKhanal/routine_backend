const {
  generateEmptyRoutine,
} = require("../algorithm/lib/generateEmptyRoutine");
const { checkIsConflict } = require("../algorithm/lib/checkConflict");
const DepartmentModel = require("../model/department.model");

const departmentService = {
  getAll: async () => {
    try {
      const departmentInDB = await DepartmentModel.find();
      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  getByID: async (id) => {
    try {
      const departmentInDB = await DepartmentModel.findById(id);
      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      let subjects = data.subjects.map((sub) => {
        return {
          subject: sub.subjectID,
          teacher: sub.teacherID,
          semester: sub.semester,
        };
      });

      const departmentInDB = await DepartmentModel.findOne({
        name: data.name,
      });

      if (departmentInDB) throw new Error("department already exists");

      const newDepartment = new DepartmentModel({
        name: data.name,
        subjects,
      });

      await newDepartment.save();

      return newDepartment;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const departmentInDB = await DepartmentModel.findOneAndUpdate(
        id,
        { ...data },
        options
      );

      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const departmentInDB = await DepartmentModel.findByIdAndDelete(id);
      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  addRoutine: async ({ deptID, routineID, semester }) => {
    try {
      const departmentInDB = await DepartmentModel.findById(deptID).populate(
        "routines"
      );

      let routines = [...departmentInDB.routines];

      const semIdx = routines.findIndex((r) => r.semester === semester);

      routines[semIdx] = {
        semester,
        routine: routineID,
      };

      departmentInDB.routines = routines;

      await departmentInDB.save();

      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
  checkConflict: async ({
    departmentName,
    semester,
    subjectAlias,
    teacherAlias,
    weekDayIdx,
    timeSlotIdx,
  }) => {
    try {
      const departmentsInDB = await DepartmentModel.find().populate({
        path: "routines.routine",
        model: "Routine",
      });

      return checkIsConflict(
        departmentsInDB,
        departmentName,
        semester,
        subjectAlias,
        teacherAlias,
        weekDayIdx,
        timeSlotIdx
      );
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = departmentService;
