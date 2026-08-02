const {DataTypes} = require("sequelize");
const db = require("../config/conectionDB");
const cattle = db.define("cattle",{
    // gestion de bovinos
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {// nombre del bovino
        type: DataTypes.STRING,
        allowNull: false
    },
    raze: {// raza del bovino
        type: DataTypes.STRING,
        allowNull: false
    },
    "entry date": {// fecha de ingreso del bovino a la finca
        type: DataTypes.DATE,
        allowNull: false
    },
    paddock: {// potrero donde se encuentra el bovino
        type: DataTypes.STRING,
        allowNull: false                    
    },
    birthdate: {// fecha de nacimiento del bovino
        type: DataTypes.DATE,
        allowNull: false
    },
    photo: {// foto del bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    currentweight: {// peso actual del bovino
        type: DataTypes.FLOAT,
        allowNull: false
    },
    classificationbytype: {// clasificación del bovino por tipo (ternero, novillo, vaca, toro)
        type: DataTypes.STRING,
        allowNull: false    
    },
    state: {// estado del bovino (activo, vendido, muerto)
        type: DataTypes.STRING,
        allowNull: false
    },

    // // gestion de nacimientos 
    // motheridentification: {// identificación de la madre del bovino
    // type: DataTypes.STRING,
    // allowNull: true
    // },
    // landidentification: {// identificación del terreno donde nació el bovino
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // birthdate: {// fecha de nacimiento del bovino
    //     type: DataTypes.DATE,
    //     allowNull: true 
    // },
    // sex: {// sexo del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true 
    // },
    // race: {// raza del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true 
    // }, 
    // birthweight: {// peso al nacer del bovino
    //     type: DataTypes.FLOAT,
    //     allowNull: true 
    // },
    // conditionatbirth: {// condición al nacer del bovino (normal, prematuro, con dificultades)
    //     type: DataTypes.STRING,
    //     allowNull: true 
    // },
    // observations: { // observaciones adicionales sobre el nacimiento del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // responsible: {// responsable del registro del nacimiento del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    
    // // gestion de mortalidad
    // animalidentification: {// identificación del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // dateofdeath: {// fecha de muerte del bovino
    //     type: DataTypes.DATE,   
    //     allowNull: true
    // },
    // causeofdeath: {// causa de muerte del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // responsible: {// responsable del registro de la muerte del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true 
    // },
    // fateoftheanimal: {// destino del animal después de la muerte (enterrado, incinerado, vendido para consumo)
    //     type: DataTypes.STRING,
    //     allowNull: true         
    // },
    // observations: {// observaciones adicionales sobre la muerte del bovino
    //     type: DataTypes.STRING,
    //     allowNull: true 
    // },
    
});
module.exports = cattle;