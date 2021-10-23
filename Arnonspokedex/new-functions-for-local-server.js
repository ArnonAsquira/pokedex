import * as global from './global-variables-for-inedx';
import  * as updateToDom from './updatingToDom';

let pokemonID;

let config = {
    headers: {
      username: "Arnon"
    }
  }

const localServerUrl = 'http://localhost:3000'; 
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


export async function innerFetch(req) {
    addLoader();
    try{
        let pokemonObj;
        if(Number(req)) {
            pokemonObj = await axios.get(`${localServerUrl}/pokemon/get/${req}`, config);
        } else{
            pokemonObj = await fetch(`${localServerUrl}/pokemon/query`,{
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  'username': 'Arnon'
                },
                body: JSON.stringify(req) // body data type must match "Content-Type" header
              })
              console.log(pokemonObj);
        }
        pokemonID = pokemonObj.data.id;
        console.log(pokemonObj);
        updateToDom.updatePOkemonToDom(pokemonObj.data);
        function changeToBackSprite(e) {
            console.log(pokemonObj.data['back_pic']);
            changesprite(e.target, pokemonObj.data['back_pic']);
        }
            function defaultImg(e){
            console.log(pokemonObj.data['front_pic']);
            changesprite(e.target, pokemonObj.data['front_pic']);
        }
        global.pokemonImg.addEventListener('mouseenter', changeToBackSprite);
        global.pokemonImg.addEventListener('mouseleave', defaultImg);
        global.cathcPokemonBtn.addEventListener('click', catchPokemon);
        global.realeasPokemonBtn.addEventListener('click', releasePokemon);
        removeLoader();
    } catch (error) {
        console.log(error);
        removeLoader();
    }
}

function catchPokemon(e) {
    addLoader();
    try {
        axios.put(`${localServerUrl}/pokemon/catch/${pokemonID}`, {}, config);
        alert('pokemon caught');
        removeLoader();
    }catch(error) {
       console.log('pokemon could not be cathced');
       removeLoader();
    }
}

function releasePokemon(e) {
    addLoader();
    try {
        axios.delete(`${localServerUrl}/pokemon/release/${pokemonID}`, config);
        alert('released');
        removeLoader();
    }catch(error) {
       console.log('pokemon could not be released');
       removeLoader();
    }
}

function showCaughtPokemons(e) {

}

function newCreatePokeImgCard(url, name) {
    const pokeImg = createElement('img', [], [], {src:`${url}`});
    const card = createElement('div', [pokeImg], ['pokeImg-card', 'col-sm'], {['data-name']: name});
    // card.addEventListener('click', searchByImg);
    document.querySelector('.caught-pokemons-div').appendChild(card);
}