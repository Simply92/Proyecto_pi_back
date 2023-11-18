const {pokapiInfo} = require('./pokemonsApi');
const {getDbInfo} = require('./pokemonsDB');

const allPokemons = async () => {
    try {
    const apiInfo = await pokapiInfo(); //GUARDO LOS DATOS DE LA CONSULTA A LA API
    const dbInfo = await getDbInfo();   //GUARDO LOS DATOS DE LA CONSULTA A LA DB
    const infoTotal = apiInfo.concat(dbInfo); //CONCATENO LAS DOS Y RETORNO ESTO.
    return infoTotal;
    } catch (error) {
        console.log({error: "Error"})
    }
}

module.exports = {allPokemons};