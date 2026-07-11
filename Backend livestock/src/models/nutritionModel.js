const{DataTypes} = require('sequelize');
const db = require('../config/ConectionDB');


const nutrition =db.define('nutrition',{
    //campos de la tabla de nutricion
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    animal_identifier:{
        type: DataTypes.STRING, //puede ser el numero de arete o cualquier identificador unico del animal
        allowNull: false,
        unique: true
    },
    food_code:{
        type: DataTypes.STRING,//conectate al catalogo de alimentos para obtener el codigo del alimento
        allowNull: false,
        unique: true
    },
    
    food_type:{
        type: DataTypes.STRING,//pasto, concentrado, silo,forraje, etc
        allowNull: false
    },
    quantity:{
        type: DataTypes.STRING,//en kg,litras segun el tipo de alimento
        allowNull: false,
        unique: true
    },
    frequency:{
        type: DataTypes.STRING,//mañama tarde, noche
        allowNull: false
    },
        responsible:{
        type: DataTypes.STRING,//nombre del responsable de la nutricion
        allowNull: false
    },
        registration_date:{
        type: DataTypes.DATE,//fecha y hora de registro de la nutricion
        allowNull: false
    },

    // //campos tabla de alimentos
    // feed_id:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'alimentos',// nombre de la tabla a la que se refiere
    //         key: 'id'
    //     }
    // },
    // food_code:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true
    // },
    // quantity_consumed:{
    //     type: DataTypes.STRING,//en kg,litros segun el tipo de alimento
    //     allowNull: false
    // },
    // feeding_time:{
    //     type: DataTypes.STRING,//mañama tarde, noche
    //     allowNull: false
    // },
    // nutrition_type:{
    //     type: DataTypes.STRING,//pasto, concentrado, silo,forraje, etc
    //     allowNull: false
    // },
    // responsible:{
    //     type: DataTypes.STRING,//nombre del responsable de la nutricion
    //     allowNull: false
    // },
    // registration_date:{
    //     type: DataTypes.DATE,//fecha y hora de registro de la nutricion
    //     allowNull: false
    // }
});
module.exports = nutrition;