import * as global from './global-variables-for-inedx';
//event listeners functions
export async function searchPokemon(e) {
    let identifier;
    if(e.target.tagName === 'BUTTON'){
        identifier = e.target.previousElementSibling.value;
    }else if(e.target.tagName === 'SELECT'){
            identifier =  e.target.value;
    }
    if(!identifier){
        alert('please enter a text');
    }else{
        global.submitionDiv.lastElementChild.classList.add('loader');
        try{
            const pokemonObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
            updatePOkemonToDom(pokemonObj.data);
            const backImg = pokemonObj.data['sprites']['back_default'];
            function changeToBackSprite(e) {
                    e.target.src = backImg;
            }
            function defaultImg(e) {
                e.target.src = pokemonObj.data['sprites']['front_default']
            }
            global.pokemonImg.addEventListener('mouseenter', changeToBackSprite);
            global.pokemonImg.addEventListener('mouseleave', defaultImg);
            global.submitionDiv.lastElementChild.classList.remove('loader');
        }catch (error){
            global.submitionDiv.lastElementChild.classList.remove('loader');
            alert('no such pokemon. maybe in the next generation')
            throw error;
        }
    }
}
//
function updatePOkemonToDom(response) {
     global.pokemonNameDiv.innerText = `name: ${response['name']}`;
     global.pokemonHeightDiv.innerText = `height: ${response['height']}`;
     global.pokemonWeightDiv.innerText = `weight: ${response['weight']}`;
     global.pokemonImg.src = `${response['sprites']['front_default']}`;
     global.pokemonType.innerText = 'type: '
     global.type1.innerText = response['types'][0]['type']['name'];
     try{
        global.type2.innerText = response['types'][1]['type']['name'];
     } catch (error){
        global.type2.innerText = '';
     }
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