import style from "./styles.css";
import * as global from './global-variables-for-inedx';
import * as listener from './eventliseteners-for-index';
import  * as newListeners from './new-functions-for-local-server';
//event listener for search buttons
global.nameSearchButton.addEventListener('click', listener.searchPokemon);
global.idSearchButton.addEventListener('click', listener.searchPokemon);
global.type1.addEventListener('click', listener.getPokemonByType);
global.type2.addEventListener('click', listener.getPokemonByType);
document.body.addEventListener('click', listener.removeTypeList);
global.randomButton.addEventListener('click', listener.randomize);
global.dropdownMenuTypes.addEventListener('click', listener.getAllPokemonsOfType);
global.showCaughtPokemon.addEventListener('click', newListeners.showCaughtPokemons);

// adjusting the type name and its color for the types menu
Array.from(global.dropdownMenuTypes.children).forEach(li =>{
   li.style.color = global.TypeColorMapper[li.textContent];
})