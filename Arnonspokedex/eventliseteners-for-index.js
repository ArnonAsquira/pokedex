import * as global from './global-variables-for-inedx';
import * as newListenesrs from './new-functions-for-local-server';
import * as updatingToDom from './updatingToDom';

//event listeners functions
//search pokemon
export async function searchPokemon(e) {
    let identifier = identify(e.target, 'BUTTON', 'SELECT');
    if(!identifier){
        alert('please enter a text');
        return;
    }
    newListenesrs.innerFetch(identifier);
}
//
export async function getPokemonByType(e) {
    if(e.target.tagName !== 'P'){
      return;
    }
   const type = e.target.innerText;
   global.submitionDiv.lastElementChild.classList.add('loader');
        try{
            const pokemonObj = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
            showListbyType(pokemonObj.data, e.target);
            global.submitionDiv.lastElementChild.classList.remove('loader');
        }catch (error){
            global.submitionDiv.lastElementChild.classList.remove('loader');
            throw error;
        }
}
//
function showListbyType(response, target) {
    const typeList = document.createElement('select');
    const pokemonArray = response['pokemon'];
    pokemonArray.forEach(pokemon => {
        const option = document.createElement('option');
        option.innerText = pokemon['pokemon']['name'];
        typeList.appendChild(option);
    });
    target.appendChild(typeList);
    typeList.addEventListener('change', searchPokemon);
}
//
export function removeTypeList(e) {
   if(e.target.tagName !== 'SELECT'){
       if( global.type1.firstElementChild){
        global.type1.firstElementChild.remove();
       }
       if( global.type2.firstElementChild){
        global.type2.firstElementChild.remove();
       }
   }
}
//identifies the correct targer
function identify(checker) {
    if(checker.tagName === arguments[1]){
        return checker.previousElementSibling.value;
    }else if(checker.tagName === arguments[2]){
        return checker.value;
    }
}
// random pokemon generator
export function randomize(e) {
     
   if(e.target.tagName !== 'BUTTON'){
       return;
   }
   const randomNum = createRandom();
   console.log(randomNum);
   newListenesrs.innerFetch(randomNum);
}

// create random number
function createRandom() {
    const randomDigit1 = Math.floor((Math.random() * 10) + 0.5);
    const randomDigit2 = Math.floor((Math.random() * 10) + 0.5);
    const randomDigit3 = Math.floor((Math.random() * 10) + 0.5);
    const randomNum = randomDigit1 * randomDigit2 * randomDigit3;
    if(randomNum > 898) {
        return randomNum - 102;
    } if(randomNum < 1) {
       return randomNum + 34;
    }
    return randomNum;
}
// inner fetch request function

// getPokemon by type from dropdown menu
export async function getAllPokemonsOfType(e) {
    if(e.target.tagName !== 'LI'){
        return;
    }
    const req = e.target.innerText;
    const pokemonObj =  await axios.get(`https://pokeapi.co/api/v2/type/${req}`);
    const pokemons = pokemonObj.data.pokemon;
    // remove prior image cards
    if(document.querySelector('.pokeImg-container').firstElementChild){
        Array.from(document.querySelector('.pokeImg-container').children).forEach(child => {child.remove()})
    }
    //
    pokemons.forEach(pokemonData => {
       const newPokemonObj = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonData.pokemon.name}`)
       .then(data => {
            const imgUrl = data.data.sprites['front_default'];
            const pokeName = data.data.name;
            createPokeImgCard(imgUrl, pokeName);
       })
    })
}

//create pokemo image card
function createPokeImgCard(url, name) {
    const pokeImg = updatingToDom.createElement('img', [], [], {src:`${url}`});
    const card = updatingToDom.createElement('div', [pokeImg], ['pokeImg-card', 'col-sm'], {['data-name']: name});
    card.addEventListener('click', searchByImg);
    document.querySelector('.pokeImg-container').appendChild(card);
}



// search pokemon by image card function
async function searchByImg(e) {
    let target;
    if(e.target.tagName === 'IMG'){
        target = e.target.parentElement
    }else{
        target = e.target;
    }
    const pokemonName = target.getAttribute(['data-name']);
    try{
      const pokeObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      updatePOkemonToDom(pokeObj.data);
    }catch(error){
        throw(error + 'nooooooooo');
    }
}

