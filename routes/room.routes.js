const router = require("express").Router();

const roomController = require("../controller/room.controller");

router.post("/add", roomController.add);
router.get("/getAll", roomController.getAll);
router.get("/getId/:id", roomController.getByID);
router.patch("/update/:id", roomController.update);
router.delete("/delete/:id", roomController.delete);

module.exports = { roomRouter: router };
