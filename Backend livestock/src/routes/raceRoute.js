const express = require("express");
const router = express.Router();
const {
    getAllRaces,
    getRaceByIdController,
    createRace,
    updateRace,
    deleteRace
} = require("../controllers/raceController");
const ValidateToken = require("../middlewares/handlerToken");

router.get("/RaceAll", ValidateToken, getAllRaces);
router.get("/RaceById/:id_race", ValidateToken, getRaceByIdController);
router.post("/CreateRace", ValidateToken, createRace);
router.put("/UpdateRace/:id_race", ValidateToken, updateRace);
router.delete("/DeleteRace/:id_race", ValidateToken, deleteRace);

module.exports = router;