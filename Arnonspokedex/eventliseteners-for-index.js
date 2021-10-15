import { concatSeries } from 'async';
import * as global from './global-variables-for-inedx';
//event listeners functions
export async function searchPokemon(e) {
    let identifier = identify(e.target, 'BUTTON', 'SELECT');
    if(!identifier){
        alert('please enter a text');
        return;
    }
    innerFetch(identifier, e.target);
}
//
function updatePOkemonToDom(response) {
    innerDomUpdate(global.pokemonNameDiv, 'innerText',`name: ${response['name']}`);
    innerDomUpdate(global.pokemonHeightDiv, 'innerText',`height: ${response['height']}` );
    innerDomUpdate(global.pokemonWeightDiv, 'innerText', `weight: ${response['weight']}`);
    innerDomUpdate(global.type1, 'innerText','type: ');
    innerDomUpdate(global.pokemonImg, 'src', `${response['sprites']['front_default']}`);
    innerDomUpdate(global.type1, 'innerText', response['types'][0]['type']['name']);
     try{
        innerDomUpdate(global.type2, 'innerText', response['types'][1]['type']['name']);
        global.type2.style.color = global.TypeColorMapper[global.type2.innerText];
     } catch (error){
        innerDomUpdate(global.type2, 'innerText', '');
        global.type2.style.color = '';
     }
     global.type1.style.color = '';
     global.type1.style.color = global.TypeColorMapper[global.type1.innerText];
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
// add loader function
function addLoader() {
    global.submitionDiv.lastElementChild.classList.add('loader');
}
// remove loader function
function removeLoader() {
    global.submitionDiv.lastElementChild.classList.remove('loader');
}
// change to back sprite function
function changesprite(target, img) {
   target.src = img;
}
// inner dom update function
function innerDomUpdate(elem, attr,update) {
  elem[attr] = update;
}

// random pokemon generator
export function randomize(e) {
     
   if(e.target.tagName !== 'BUTTON'){
       return;
   }
   const randomNum = createRandom();
   console.log(randomNum);
   innerFetch(randomNum, e.target);
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
async function innerFetch(req, target) {
    addLoader();
    try{
        const pokemonObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req}`);
        console.log(pokemonObj.data);
        updatePOkemonToDom(pokemonObj.data);
        function changeToBackSprite(e) {
            changesprite(e.target, pokemonObj.data['sprites']['back_default']);
        }
        function defaultImg(e){
            changesprite(e.target, pokemonObj.data['sprites']['front_default']);
        }
        global.pokemonImg.addEventListener('mouseenter', changeToBackSprite);
        global.pokemonImg.addEventListener('mouseleave', defaultImg);
        removeLoader();
    }catch (error){
        removeLoader();
        alert('no such pokemon. maybe in the next generation')
        throw error;
    }
}
