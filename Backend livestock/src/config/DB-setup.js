export const DEFAULT_ROLES = [
  { slug: "superadmin", name_roll: "Super Administrador" },
  { slug: "admin", name_roll: "Administrador" },
  { slug: "instructor", name_roll: "Instructor" },
  { slug: "pasante", name_roll: "Pasante" },
  { slug: "gestor", name_roll: "Gestor" },
];

export const DEFAULT_APP_ROUTES = [
  // Dashboard
  {
    name_route: "dashboard",
    route: "/dashboard",
    active: true,
    icon: "layout-dashboard",
  },

  // Bovino
  {
    name_route: "crearbovino",
    route: "/dashboard/cattle/createCattle",
    active: true,
    icon: "horse",
  },
  {
    name_route: "listarbovinos",
    route: "/dashboard/cattle/listCattle",
    active: true,
    icon: "list",
  },

  // Pesaje
  {
    name_route: "crearpesaje",
    route: "/dashboard/weighing/createWeighing",
    active: true,
    icon: "weight",
  },
  {
    name_route: "listarpesajes",
    route: "/dashboard/weighing/listWeighing",
    active: true,
    icon: "clipboard-list",
  },

  // Nacimiento
  {
    name_route: "crearnacimiento",
    route: "/dashboard/birth/crearBirth",
    active: true,
    icon: "baby",
  },
  {
    name_route: "listarnacimientos",
    route: "/dashboard/birth/listarBirth",
    active: true,
    icon: "list",
  },

  // Mortalidad
  {
    name_route: "crearmortalidad",
    route: "/dashboard/mortality/crearMortality",
    active: true,
    icon: "skull",
  },
  {
    name_route: "listarmortalidad",
    route: "/dashboard/mortality/listarMortality",
    active: true,
    icon: "list",
  },

  // Nutrición
  {
    name_route: "crearnutricion",
    route: "/dashboard/nutrition/createNutrition",
    active: true,
    icon: "apple",
  },
  {
    name_route: "listarnutricion",
    route: "/dashboard/nutrition/listNutrition",
    active: true,
    icon: "list",
  },

  // Alimentación
  {
    name_route: "crearalimentacion",
    route: "/dashboard/food/createFood",
    active: true,
    icon: "wheat",
  },
  {
    name_route: "listaralimentacion",
    route: "/dashboard/food/listFood",
    active: true,
    icon: "list",
  },

  // Vacunación
  {
    name_route: "crearvacunacion",
    route: "/dashboard/vacunation/createVacunation",
    active: true,
    icon: "syringe",
  },
  {
    name_route: "listarvacunacion",
    route: "/dashboard/vacunation/listVacunation",
    active: true,
    icon: "list",
  },

  // Tratamiento
  {
    name_route: "creartratamiento",
    route: "/dashboard/treatment/createTreatment",
    active: true,
    icon: "briefcase-medical",
  },
  {
    name_route: "listartratamiento",
    route: "/dashboard/treatment/listTreatment",
    active: true,
    icon: "list",
  },

  // Inseminación artificial
  {
    name_route: "crearinseminacion",
    route: "/dashboard/artificialInsemination/createArtificialInsemination",
    active: true,
    icon: "dna",
  },
  {
    name_route: "listarinseminacion",
    route: "/dashboard/artificialInsemination/listArtificialInsemination",
    active: true,
    icon: "list",
  },

  // Monta natural
  {
    name_route: "crearmonta",
    route: "/dashboard/mount/createMount",
    active: true,
    icon: "heart",
  },
  {
    name_route: "listarmonta",
    route: "/dashboard/mount/listMount",
    active: true,
    icon: "list",
  },

  // Producción de leche
  {
    name_route: "crearproduccionleche",
    route: "/dashboard/milk/createMilk",
    active: true,
    icon: "milk",
  },
  {
    name_route: "listarproduccionleche",
    route: "/dashboard/milk/listMilk",
    active: true,
    icon: "list",
  },

  // Potreros
  {
    name_route: "crearpotrero",
    route: "/dashboard/pasture/createPasture",
    active: true,
    icon: "map-pin",
  },
  {
    name_route: "listarpotreros",
    route: "/dashboard/pasture/listPasture",
    active: true,
    icon: "list",
  },

  // Usuarios
  {
    name_route: "crearusuario",
    route: "/dashboard/user/createUser",
    active: true,
    icon: "user-plus",
  },
  {
    name_route: "listarusuarios",
    route: "/dashboard/user/listUser",
    active: true,
    icon: "users",
  },

  // Responsables
  {
    name_route: "crearresponsable",
    route: "/dashboard/responsible/createResponsible",
    active: true,
    icon: "user-cog",
  },
  {
    name_route: "listarresponsables",
    route: "/dashboard/responsible/listResponsible",
    active: true,
    icon: "list",
  },
];

export const DEFAULT_ROLL_APP_ROUTES = [];
