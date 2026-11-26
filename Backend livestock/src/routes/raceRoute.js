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
const { authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/RaceAll", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), getAllRaces);
router.get("/RaceById/:id_race", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), getRaceByIdController);
router.post("/CreateRace", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), createRace);
router.put("/UpdateRace/:id_race", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), updateRace);
router.delete("/DeleteRace/:id_race", ValidateToken, authorizeRoles("admin", "instructor"),  deleteRace);

module.exports = router;