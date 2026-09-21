const {createRoll, createRoutes, createRoutesRoll} = require("../services/setupAppServices");

async function setup() {
    try {
        await createRoll();
        await createRoutes();
        await createRoutesRoll();
        console.log("Database setup completed successfully.");
    } catch (error) {
        console.error("Error during database setup:", error);
    }
};