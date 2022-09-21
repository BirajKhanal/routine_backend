const Joi = require("@hapi/joi");
const teacherService = require("../service/teacher.service");

const teacherAddSchema = Joi.object({
  name: Joi.string().required(),
  initial: Joi.string().required(),
  workload: Joi.number().required(),
  type: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
});

const teacherUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  initial: Joi.string().optional(),
  workload: Joi.number().optional(),
  type: Joi.string().optional(),
  startTime: Joi.string().optional(),
  endTime: Joi.string().optional(),
});

const teacherController = {
  add: async (req, res) => {
    try {
      const { error } = await teacherAddSchema.validateAsync(req.body);

      if (error) {
        res.status(400).json(error.details[0].message);
      }

      const dataToSave = await teacherService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await teacherService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await teacherService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { error } = await teacherUpdateSchema.validateAsync(req.body);

      if (error) {
        res.status(400).json(error.details[0].message);
      }

      const result = await teacherService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const teacherInDB = await teacherService.delete(req.params.id);

      res.send(`Document with ${teacherInDB.name} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = teacherController;
