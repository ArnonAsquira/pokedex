import style from "./styles.css";
import * as global from './global-variables-for-inedx';
import * as listener from './eventliseteners-for-index';
//event listener for search buttons
global.nameSearchButton.addEventListener('click', listener.searchPokemon);
global.idSearchButton.addEventListener('click', listener.searchPokemon);
global.type1.addEventListener('click', listener.getPokemonByType);
global.type2.addEventListener('click', listener.getPokemonByType);
document.body.addEventListener('click', listener.removeTypeList);