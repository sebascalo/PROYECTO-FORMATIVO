const jwt = require ("jsonwebtoken")
require ("dotenv").config();
const Response = require("../functions/response");

function ValidateToken(req, res, next) {
    // const headers= req.headers['authorization'];
    // const token= headers && headers.split(' ')[1];
    // console.log("Token recibido: ", token);
    // if(!token || token === "null" || token === "undefined") {
    //     let response = new Response("Token no proporcionado", null, false);
    //     return res.status(403).json(response.json);
    // }
    // jwt.verify(token, process.env.JWT_KEY_SECRET, (err, user) => {
    //     if(err) {
    //         let response = new Response("Token no válido", null, false);
    //         return res.status(403).json(response.json);
    //     }
    //     req.user= user;
    //     next();
    // });
    next();
}
module.exports = ValidateToken;