const router = require("express").Router();

const teacherController = require("../controller/teacher.controller");

router.post("/add", teacherController.add);
router.get("/getAll", teacherController.getAll);
router.get("/getId/:id", teacherController.getByID);
router.patch("/update/:id", teacherController.update);
router.delete("/delete/:id", teacherController.delete);

module.exports = { teacherRouter: router };
