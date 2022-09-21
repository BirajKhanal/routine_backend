const router = require("express").Router();

const { teacherRouter } = require("./teacher.routes");
const { subjectRouter } = require("./subject.routes");
const { departmentRouter } = require("./department.routes");
const { roomRouter } = require("./room.routes");
const { userRouter } = require("./user.routes");
const { routineRouter } = require("./routine.routes");

const verify = require("../middleware/auth.middleware");

router.use("/teachers", verify, teacherRouter);
router.use("/subjects", verify, subjectRouter);
router.use("/departments", verify, departmentRouter);
router.use("/rooms", verify, roomRouter);
router.use("/users", userRouter);
router.use("/routines", verify, routineRouter);

module.exports = router;
