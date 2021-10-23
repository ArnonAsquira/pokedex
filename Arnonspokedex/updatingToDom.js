import * as global from './global-variables-for-inedx';

// inner dom update function
function innerDomUpdate(elem, attr, update) {
    elem[attr] = update;
}


export function updatePOkemonToDom(response) {
    innerDomUpdate(global.pokemonNameDiv, 'innerText',`name: ${response['name']}`);
    innerDomUpdate(global.pokemonHeightDiv, 'innerText',`height: ${response['height']}` );
    innerDomUpdate(global.pokemonWeightDiv, 'innerText', `weight: ${response['weight']}`);
    innerDomUpdate(global.type1, 'innerText','type: ');
    innerDomUpdate(global.pokemonImg, 'src', `${response['front_pic']}`);
    innerDomUpdate(global.type1, 'innerText', response['types'][0]['type']['name']);
    global.cathcPokemonBtn.hidden = false;
    global.realeasPokemonBtn.hidden = false;
     try{
        innerDomUpdate(global.type2, 'innerText', response['types'][1]['type']['name']);
        global.type2.style.color = global.TypeColorMapper[global.type2.innerText];
     } catch (error){
        innerDomUpdate(global.type2, 'innerText', '');
        global.type2.style.color = '';
     }
     global.type1.style.color = '';
     global.type1.style.color = global.TypeColorMapper[global.type1.innerText];
     global.pokedexCardDiv.hidden = false;
}