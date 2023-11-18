const {Pokemon, Type} = require("../db");

const newPokemons = async (data) => {
    const creatPokemon = await Pokemon.create({
        name: data.name,
        image: data.image,
        hp: data.hp,
        attack: data.attack,
        defense: data.defense,
        speed: data.speed,
        height: data.height,
        weight: data.weight,
        image: data.image
    })
    
    if(Array.isArray(data.types) && data.types.length){ //Consulto si lo que me llega en TYPES, es un arreglo y si tiene algo adentro.
        let dbTypes = await Promise.all( //utiliza promise.all para realizar busqueda en la tabla types
          data.types.map((e) => {  
            return Type.findOne({where:{ name: e}}) 
          })
        )
       await creatPokemon.setTypes(dbTypes) //asocia los TYPES encontrados con el pokemon creado
        }  
}

module.exports = newPokemons;