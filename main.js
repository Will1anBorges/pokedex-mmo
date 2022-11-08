
const pokemonName = document.querySelector('.poke-name');
const pokemonNumber = document.querySelector('.poke-number');
const pokemonImage = document.querySelector('.poke-img');
const input = document.querySelector('.input-search');
const form = document.querySelector('.form');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const abilities = document.querySelector('.abilities');
const type = document.querySelector('.type');
const secondType = document.querySelector('.secondType');
const hidenAbility = document.querySelector('.hidenAbility')
const height = document.querySelector('.height');
const weight = document.querySelector('.weight');
const held = document.querySelector('.held');
const egg = document.querySelector('.egg');
const description = document.querySelector('.description');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  
  pokemonName.innerHTML = 'Loading ..'
  pokemonNumber.innerHTML = '';
  
  const data = await fetchPokemon(pokemon);
  
  const audioPokedex = new Audio('/cries/pokedex.mp3');
  audioPokedex.load();
  audioPokedex.volume = 0.2;
  audioPokedex.play();

  const audioPoke = new Audio(`/cries/${data.id}.wav`);
  audioPoke.load();
  audioPoke.volume = 0.2;
  audioPoke.play();

  try{
    
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    type.innerHTML = data['types']['0']['type']['name'];
    if (type.innerHTML == "grass") {
      type.style.background = '#568f00';
    } else if(type.innerHTML == "fire") {
      type.style.background = '#fd7d24';
    } else if(type.innerHTML == "water") {
      type.style.background = '#4592c4';
    } else if(type.innerHTML == "bug") {
      type.style.background = '#ace56b';
    } else if(type.innerHTML == "normal") {
      type.style.background = '#a4acaf';
    } else if(type.innerHTML == "poison") {
      type.style.background = '#b97fc9';
    } else if(type.innerHTML == "electric") {
      type.style.background = '#eed535';
    } else if(type.innerHTML == "ground") {
      type.style.background = 'linear-gradient(180deg, #5C4F2F 50%, #B3A66B 50%)';
    } else if(type.innerHTML == "fairy") {
      type.style.background = '#fdb9e9';
    } else if(type.innerHTML == "fighting") {
      type.style.background = '#d56723';
    } else if(type.innerHTML == "psychic") {
      type.style.background = '#f366b9';
    } else if(type.innerHTML == "rock") {
      type.style.background = '#a38c21';
    } else if(type.innerHTML == "ghost") {
      type.style.background = '#7b62a3';
    } else if(type.innerHTML == "ice") {
      type.style.background = '#51c4e7';
    } else if(type.innerHTML == "dragon") {
      type.style.background = 'linear-gradient(#53a4cf 50%, #f16e57 50%)';
    } else if(type.innerHTML == "dark") {
      type.style.background = '#242424';
    } else if(type.innerHTML == "steel") {
      type.style.background = '#9eb7b8';
    } else if(type.innerHTML == "flying") {
      type.style.background = 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
    } 

    description.innerHTML = data['species']['url']['flavor_text_entries']
    height.innerHTML = data.height;
    weight.innerHTML = data.weight;
    abilities.innerHTML = data['abilities']['0']['ability']['name'];
    hidenAbility.innerHTML = data['abilities']['1']['ability']['name'];
    egg.innerHTML = data['species']['url']['egg_groups'];
    
    try {
      secondType.innerHTML = data['types']['1']['type']['name'];
      if (secondType.innerHTML == "grass") {
        secondType.style.background = '#568f00';
      } else if(secondType.innerHTML == "fire") {
        secondType.style.background = '#fd7d24';
      } else if(secondType.innerHTML == "water") {
        secondType.style.background = '#4592c4';
      } else if(secondType.innerHTML == "bug") {
        secondType.style.background = '#ace56b';
      } else if(secondType.innerHTML == "normal") {
        secondType.style.background = '#a4acaf';
      } else if(secondType.innerHTML == "poison") {
        secondType.style.background = '#b97fc9';
      } else if(secondType.innerHTML == "electric") {
        secondType.style.background = '#eed535';
      } else if(secondType.innerHTML == "ground") {
        secondType.style.background = 'linear-gradient(180deg, #5C4F2F 50%, #B3A66B 50%)';
      } else if(secondType.innerHTML == "fairy") {
        secondType.style.background = '#fdb9e9';
      } else if(secondType.innerHTML == "fighting") {
        secondType.style.background = '#d56723';
      } else if(secondType.innerHTML == "psychic") {
        secondType.style.background = '#f366b9';
      } else if(secondType.innerHTML == "rock") {
        secondType.style.background = '#a38c21';
      } else if(secondType.innerHTML == "ghost") {
        secondType.style.background = '#7b62a3';
      } else if(secondType.innerHTML == "ice") {
        secondType.style.background = '#51c4e7';
      } else if(secondType.innerHTML == "dragon") {
        secondType.style.background = 'linear-gradient(#53a4cf 50%, #f16e57 50%)';
      } else if(secondType.innerHTML == "dark") {
        secondType.style.background = '#242424';
      } else if(secondType.innerHTML == "steel") {
        secondType.style.background = '#9eb7b8';
      } else if(secondType.innerHTML == "flying") {
        secondType.style.background = 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
      }
    
    } catch (e) {
      throw new Error ('Erro ao capturar o segundo tipo')
    } finally {
      
      try {
        held.innerHTML = data['held_items']['0']['item']['name'];
      } catch (e) {
        throw new Error ('Erro ao selecionar item segurado')
      }
    }
    
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not founded!';
    pokemonNumber.innerHTML = '';
  }
} catch (e) {
  switch (e.message) {
    case 'Erro ao selecionar item segurado' : 
    held.innerHTML = 'None'
    break;

    case 'Erro ao capturar o segundo tipo' :
    secondType.innerHTML = 'None'
    secondType.style.background = '#213547'
    break;
  }

} finally {
  input.value = '';
  searchPokemon = data.id >= 644 ? data.id = 0 : data.id
}
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  
  let value = input.value
  
  if(value > 644) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 150) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 151) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 377) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 378) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 379) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 380) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 381) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 382) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 383) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 384) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 385) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 386) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 480) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 481) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 482) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 483) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 484) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 485) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 486) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 487) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 488) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 489) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 490) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 491) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 492) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 493) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 494) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 638) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 639) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 640) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 641) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 642) {
    renderPokemon(0)
    input.value = ''
  } else if (value == 643) {
    renderPokemon(0)
    input.value = ''
  } else {
    renderPokemon(input.value.toLowerCase());
}});

btnPrev.addEventListener('click' , () => {
  if (searchPokemon > 1) {
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
} else if (searchPokemon == 0) {
  renderPokemon(643)
} else {renderPokemon(644)}
  let audio = new Audio('/cries/btn.mp3');
  audio.volume = 0.1;
  audio.play();
});
  
btnNext.addEventListener('click' , () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
  let audio = new Audio('/cries/btn.mp3');
  audio.volume = 0.1;
  audio.play();
});


renderPokemon(searchPokemon);


//150 151 377-386 480-494 638-643
