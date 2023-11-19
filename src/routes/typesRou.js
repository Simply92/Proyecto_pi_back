const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../db.js");
const dotenv = require("dotenv");
dotenv.config()
const urlApi = process.env.API_URL

const router = Router();

router.get("/", async (req, res) => {
  try {
    const apiResponse = await axios.get(`${urlApi}/type`);
    const apiTypes = apiResponse.data.results.map((type) => type.name);

    // Obtener tipos existentes en la base de datos
    const dbTypes = await Type.findAll({ attributes: ['name'] });
    const dbTypeNames = dbTypes.map((dbType) => dbType.name);

    // Filtrar tipos que no existen en la base de datos
    const newTypes = apiTypes.filter((type) => !dbTypeNames.includes(type));

    // Crear nuevos tipos en la base de datos
    await Type.bulkCreate(newTypes.map((type) => ({ name: type }))); //uso bulkcreate para agregar multiples TYPES a la db en una sola operacion

    // Devolver todos los tipos de la base de datos
    const updatedTypes = await Type.findAll();
    res.status(200).json(updatedTypes);
  } catch (error) {
    res.status(400).send({error:"Error types"})
  }
});


module.exports = router;