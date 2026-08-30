const dbSetup = async() => {
//bovino
app-Router[1,"crearbovino","/dashboard/cattle/createCattle","", 1]
app-Router[2,"listarbovinos","/dashboard/cattle/listCattle","", 1]
//pesaje
app-Router[3,"crearpesaje","/dashboard/weighing/createWeighing","", 1]
app-Router[4,"listarpesajes","/dashboard/weighing/listWeighing","", 1]
//nacimiento
app-Router[5,"crearnacimiento","/dashboard/birth/crearBirth","", 1]
app-Router[6,"listarnacimientos","/dashboard/birth/listarBirth","", 1]
//mortalidad
app-Router[7,"crearmortalidad","/dashboard/mortality/crearMortality","", 1]
app-Router[8,"listarmortalidad","/dashboard/mortality/listarMortality","", 1]
//nutricion
app-Router[9,"crearnutricion","/dashboard/nutrition/createNutrition","", 1]
app-Router[10,"listarnutricion","/dashboard/nutrition/listNutrition","", 1]
//alimentacion
app-Router[11,"crearnutricion","/dashboard/food/createFood","", 1]
app-Router[12,"listarnutricion","/dashboard/food/listFood","", 1]
//vacunacion
app-Router[13,"crearvacunacion","/dashboard/vacunation/createVacunation","", 1]
app-Router[14,"listarvacunacion","/dashboard/vacunation/listVacunation","", 1]
//tratamiento
app-Router[15,"creartratamiento","/dashboard/treatment/createTreatment","", 1]
app-Router[16,"listartratamiento","/dashboard/treatment/listTreatment","", 1]
//insiminacion artificial
app-Router[17,"crearinseminacion","/dashboard/artificialInsemination/createArtificialInsemination","", 1]
app-Router[18,"listarinseminacion","/dashboard/artificialInsemination/listArtificialInsemination","", 1]
//monta natural
app-Router[19,"crearmonta","/dashboard/mount/createMount","", 1]
app-Router[20,"listarmonta","/dashboard/mount/listMount","", 1]
//produccion de leche
app-Router[21,"crearproduccionleche","/dashboard/milk/createMilk","", 1]
app-Router[22,"listarproduccionleche","/dashboard/milk/listMilk","", 1]
//potreros
app-Router[23,"crearpotrero","/dashboard/pasture/createPasture","", 1]
app-Router[24,"listarpotreros","/dashboard/pasture/listPasture","", 1]
//usuarios
app-Router[25,"crearusuario","/dashboard/user/createUser","", 1]
app-Router[26,"listarusuarios","/dashboard/user/listUser","", 1]
//responsables
app-Router[27,"crearresponsable","/dashboard/responsible/createResponsible","", 1]
app-Router[28,"listarresponsables","/dashboard/responsible/listResponsible","", 1]
};
module.exports = {
    dbSetup
};