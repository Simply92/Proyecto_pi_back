const {Pokemon, Type} = require('../db')

const getDbInfo = async () => {
    try{
      const results = await Pokemon.findAll({ //TRAERME TODO LO DE LA TABLA POKEMON, INCLUIDA LA RELACION CON TYPE
          include:{
              model: Type,
              through: {
                attributes: [],
                },
          }
      })
      const pokemonDb = results.map((pokemon) => { //transforma para que cada pokemon tenga un array con sus types
        const newpok = pokemon.toJSON();
        return {
          ...newpok,
          types: newpok.types.map((type) => type.name),
        };
      });
      return pokemonDb;
  }catch (err){
      console.log(err, "Error returning pokemon from database");
  }
} 

module.exports ={
    getDbInfo
}