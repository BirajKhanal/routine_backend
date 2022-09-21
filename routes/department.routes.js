const router = require("express").Router();

const departmentController = require("../controller/department.controller");

router.post("/add", departmentController.add);
router.get("/getAll", departmentController.getAll);
router.get("/getId/:id", departmentController.getByID);
router.patch("/update/:id", departmentController.update);
router.delete("/delete/:id", departmentController.delete);
router.post("/addRoutine/:id", departmentController.addRoutine);

module.exports = { departmentRouter: router };
