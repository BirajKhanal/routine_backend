const TeacherModel = require("../model/teacher.model");

const teacherService = {
  getAll: async () => {
    try {
      const teacherInDB = await TeacherModel.find();
      return teacherInDB;
    } catch (error) {}
  },
  getByID: async (id) => {
    try {
      const teacherInDB = await TeacherModel.findById(id);
      return teacherInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const teacherInDB = await TeacherModel.findOne({
        name: data.name,
        alias: data.alias,
      });

      if (teacherInDB) throw new Error("teacher already exists");

      const newTeacher = new TeacherModel({ ...data });
      await newTeacher.save();

      return newTeacher;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const teacherInDB = await TeacherModel.findOneAndUpdate(
        id,
        { ...data },
        options
      );

      return teacherInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const teacherInDB = await TeacherModel.findByIdAndDelete(id);
      return teacherInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = teacherService;
