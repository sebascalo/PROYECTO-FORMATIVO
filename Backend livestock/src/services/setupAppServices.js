const roll = require('../models/rollModel');
const appRoutes = require('../models/appRouteModel');
const appRouteRoll = require('../models/appRouteRollModel');
const {DEFAULT_ROLES, DEFAULT_APP_ROUTES, DEFAULT_ROLL_APP_ROUTES} = require('../config/db-setup');

const createRoll = async () => {
    try {
        for (const rollData of DEFAULT_ROLES) {
            const newRoll = await roll.create(rollData);
        }
    } catch (error) {
        throw error;
    }
};

const createRoutes = async () => {
    try {
        for (const routeData of DEFAULT_APP_ROUTES) {
            const newRoute = await appRoutes.create(routeData);
        }
    } catch (error) {
        throw error;
    }
};

const createRoutesRoll = async () => {
    try {
        for (const routeRollData of DEFAULT_ROLL_APP_ROUTES) {
            const newRouteRoll = await appRouteRoll.create(routeRollData);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRoll,
    createRoutes,
    createRoutesRoll
};