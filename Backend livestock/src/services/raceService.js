const race = require("../models/raceModel");

const raceCreate = async (data) => {
    try {
        const newRace = await race.create(data);
        return newRace;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const racesGetAll = async (limit, offset) => {
    try {
        const races = await race.findAll({ offset, limit });
        return races;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getRaceById = async (id_race) => {
    try {
        const raceById = await race.findByPk(id_race);
        return raceById;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const raceUpdate = async (id_race, data) => {
    try {
        const raceToUpdate = await getRaceById(id_race);
        if (!raceToUpdate) {
            return null;
        }

        await raceToUpdate.update(data);
        return raceToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const raceDelete = async (id_race) => {
    try {
        const deletedRace = await race.destroy({ where: { id_race } });
        return deletedRace;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    raceCreate,
    racesGetAll,
    getRaceById,
    raceUpdate,
    raceDelete
};