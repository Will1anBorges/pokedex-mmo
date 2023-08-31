const Components = {
  pokemonName : document.querySelector('.poke-name'),
  pokemonNumber : document.querySelector('.poke-number'),
  pokemonImage : document.getElementById('poke-img'),
  type : document.querySelector('.type'),
  secondType : document.querySelector('.secondType'),
  description : document.querySelector('.description'),
  height : document.querySelector('.height'),
  weight : document.querySelector('.weight'),
  ability : document.querySelector('.ability'),
  hidenAbility : document.querySelector('.hidenAbility'),
  held : document.querySelector('.held'),
  egg : document.querySelector('.egg'),
  egg2 : document.querySelector('.egg2'), 
}

const notShinyIcon = document.getElementById('notShinyIcon');
const btnShiny = document.querySelector('.btnShiny');
const input = document.querySelector('.input-search');
const form = document.querySelector('.form');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const healthNum = document.querySelector('.healthNum');
const healthBar = document.querySelector('.healthBar');
const attackNum = document.querySelector('.attackNum');
const attackBar = document.querySelector('.attackBar');
const defenseNum = document.querySelector('.defenseNum');
const defenseBar = document.querySelector('.defenseBar');
const spAttackNum = document.querySelector('.sp-attackNum');
const spAttackBar = document.querySelector('.sp-attackBar');
const spDefenseNum = document.querySelector('.sp-defenseNum');
const spDefenseBar = document.querySelector('.sp-defenseBar');
const speedNum = document.querySelector('.speedNum');
const speedBar = document.querySelector('.speedBar');
const calculateTotalStats = document.querySelector('.totalStats');
const divStatsBars = document.querySelector('.statsBars');
const divStatsNum = document.querySelector('.statsNum')

// const totalNum = document.querySelector('.totalNums');
// const moveLength = move.length;
let isShiny = false;
let searchPokemon = 1;




const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
}
  
    const getDescription = async (pokemon) => { 
      const descResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
      .then(response => response.json())
      .catch((error) => console.log(error));   
      return descResponse
    }
    
  const renderPokemon = async (pokemon) => {
    Components.pokemonName.innerHTML = 'Loading ..'
    Components.pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    const desc = await getDescription(pokemon);
    
      try {
        const audioPokedex = new Audio('/cries/pokedex.mp3');
        audioPokedex.load();
        audioPokedex.volume = 0.1;
        audioPokedex.play();
      } catch (e) {
        console.log('Não foi possível captar o audio do pokemon!',e)
      }
      
      try {
        const audioPoke = new Audio(`/cries/${data.id}.wav`);
        audioPoke.load();
        audioPoke.volume = 0.1;
        audioPoke.play();
      } catch (e) {
        console.log('Não foi possível captar o audio do pokemon!',e)
      }

      const calculateAverage = (stats) => {
        const sum = stats.reduce((total, stat) => total + stat.base_stat, 0);
        return (sum);
      }
      
      if (data) {
        
        Components.pokemonImage.style.display = 'block';
        Components.pokemonName.innerHTML = data.name;
        Components.pokemonNumber.innerHTML = data.id;
        Components.type.innerHTML = data['types']['0']['type']['name'];
        Components.secondType.innerHTML = data.types['1'] ? data ['types']['1']['type']['name'] : Components.secondType.innerHTML = "None";
        Components.description.innerHTML = desc['flavor_text_entries']['0']['flavor_text'];
        Components.height.innerHTML = data.height;
        Components.weight.innerHTML = data.weight;
        Components.ability.innerHTML = data['abilities']['0']['ability']['name'];
        Components.hidenAbility.innerHTML = data.abilities['1'] ? data.abilities['1']['ability']['name'] : Components.hidenAbility.innerHTML = "None";
        Components.held.innerHTML = data.held_items['0'] ? data.held_items['0']['item']['name'] : Components.held.innerHTML = "None";
        Components.egg.innerHTML = desc['egg_groups']['0']['name'];
        Components.egg2.innerHTML = desc['egg_groups']['1'] ? desc['egg_groups']['1']['name'] : Components.egg2.innerHTML = "None" ;
        calculateTotalStats.innerHTML = calculateAverage(data.stats)
        input.value = ''
        searchPokemon = data.id >= 644 ? data.id = 0 : data.id
        
        // const MovN = (data) => {
        //   const moves = data.moves
        //   for(const moveNum in moves) {
        //     console.log(data['moves'][moveNum]['move']['name']);
            
        //     const movNu = data['moves'][moveNum]['move']['name'];
        //     const move = document.querySelector('.move');
            
        //     move.innerHTML = movNu;
        //   }}
          
        //   MovN(data)
        

    
    if (data && data.sprites && data.sprites.versions) {
      const spriteVariant = isShiny ? 'front_shiny' : 'front_default';
      const spriteUrl = data.sprites.versions['generation-v']['black-white']['animated'][spriteVariant];
      
      if (spriteUrl) {
        Components.pokemonImage.src = spriteUrl;
      }
    };
    
      if (Components.type.innerHTML == "grass") {
      Components.type.style.background = '#568f00';
    } else if(Components.type.innerHTML == "fire") {
      Components.type.style.background = '#fd7d24';
    } else if(Components.type.innerHTML == "water") {
      Components.type.style.background = '#4592c4';
    } else if(Components.type.innerHTML == "bug") {
      Components.type.style.background = '#ace56b';
    } else if(Components.type.innerHTML == "normal") {
      Components.type.style.background = '#a4acaf';
    } else if(Components.type.innerHTML == "poison") {
      Components.type.style.background = '#b97fc9';
    } else if(Components.type.innerHTML == "electric") {
      Components.type.style.background = '#eed535';
    } else if(Components.type.innerHTML == "ground") {
      Components.type.style.background = 'linear-gradient(180deg, #5C4F2F 50%, #B3A66B 50%)';
    } else if(Components.type.innerHTML == "fairy") {
      Components.type.style.background = '#fdb9e9';
    } else if(Components.type.innerHTML == "fighting") {
      Components.type.style.background = '#AF0000';
    } else if(Components.type.innerHTML == "psychic") {
      Components.type.style.background = '#f366b9';
    } else if(Components.type.innerHTML == "rock") {
      Components.type.style.background = '#a38c21';
    } else if(Components.type.innerHTML == "ghost") {
      Components.type.style.background = '#7b62a3';
    } else if(Components.type.innerHTML == "ice") {
      Components.type.style.background = '#51c4e7';
    } else if(Components.type.innerHTML == "dragon") {
      Components.type.style.background = 'linear-gradient(#53a4cf 50%, #f16e57 50%)';
    } else if(Components.type.innerHTML == "dark") {
      Components.type.style.background = '#242424';
    } else if(Components.type.innerHTML == "steel") {
      Components.type.style.background = '#9eb7b8';
    } else if(Components.type.innerHTML == "flying") {
      Components.type.style.background = 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
    } 
    
    if (Components.secondType.innerHTML == "grass") {
      Components.secondType.style.background = '#568f00';
    } else if(Components.secondType.innerHTML == "None") {
      Components.secondType.style.background = '#213547';
    } else if(Components.secondType.innerHTML == "fire") {
      Components.secondType.style.background = '#fd7d24';
    } else if(Components.secondType.innerHTML == "water") {
      Components.secondType.style.background = '#4592c4';
    } else if(Components.secondType.innerHTML == "bug") {
      Components.secondType.style.background = '#ace56b';
    } else if(Components.secondType.innerHTML == "normal") {
        Components.secondType.style.background = '#a4acaf';
      } else if(Components.secondType.innerHTML == "poison") {
        Components.secondType.style.background = '#b97fc9';
      } else if(Components.secondType.innerHTML == "electric") {
        Components.secondType.style.background = '#eed535';
      } else if(Components.secondType.innerHTML == "ground") {
        Components.secondType.style.background = 'linear-gradient(180deg, #5C4F2F 50%, #B3A66B 50%)';
      } else if(Components.secondType.innerHTML == "fairy") {
        Components.secondType.style.background = '#fdb9e9';
      } else if(Components.secondType.innerHTML == "fighting") {
        Components.secondType.style.background = '#AF0000';
      } else if(Components.secondType.innerHTML == "psychic") {
        Components.secondType.style.background = '#f366b9';
      } else if(Components.secondType.innerHTML == "rock") {
        Components.secondType.style.background = '#a38c21';
      } else if(Components.secondType.innerHTML == "ghost") {
        Components.secondType.style.background = '#7b62a3';
      } else if(Components.secondType.innerHTML == "ice") {
        Components.secondType.style.background = '#51c4e7';
      } else if(Components.secondType.innerHTML == "dragon") {
        Components.secondType.style.background = 'linear-gradient(#53a4cf 50%, #f16e57 50%)';
      } else if(Components.secondType.innerHTML == "dark") {
        Components.secondType.style.background = '#242424';
      } else if(Components.secondType.innerHTML == "steel") {
        Components.secondType.style.background = '#9eb7b8';
      } else if(Components.secondType.innerHTML == "flying") {
        Components.secondType.style.background = 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
      }

////////////////////////////////////* STATS BAR//////////////////////////////////

      healthNum.innerHTML = data['stats']['0']['base_stat'];
      healthBar.style.width = healthNum.innerHTML >= 230 ? healthNum.innerHTML / 2.6 + '%' : healthNum.innerHTML / 2 + '%';
      attackNum.innerHTML = data['stats']['1']['base_stat'];
      attackBar.style.width = attackNum.innerHTML >= 230 ? attackNum.innerHTML / 2.6 + '%' : attackNum.innerHTML / 2 + '%';
      defenseNum.innerHTML = data['stats']['2']['base_stat'];
      defenseBar.style.width = defenseNum.innerHTML >= 230 ? defenseNum.innerHTML / 2.6 + '%' : defenseNum.innerHTML / 2 + '%';
      spAttackNum.innerHTML = data['stats']['3']['base_stat'];
      spAttackBar.style.width = spAttackNum.innerHTML >= 230 ? spAttackNum.innerHTML / 2.6 + '%' : spAttackNum.innerHTML / 2 + '%';
      spDefenseNum.innerHTML = data['stats']['4']['base_stat'];
      spDefenseBar.style.width = spDefenseNum.innerHTML >= 230 ? spDefenseNum.innerHTML / 2.6 + '%' : spDefenseNum.innerHTML / 2 + '%';
      speedNum.innerHTML = data['stats']['5']['base_stat'];
      speedBar.style.width = speedNum.innerHTML >= 230 ? speedNum.innerHTML / 2.6 + '%' : speedNum.innerHTML / 2 + '%';

      divStatsBars.style.display = 'flex';
      divStatsNum.style.display = 'flex';

      statsColor(healthNum,healthBar);
      statsColor(attackNum,attackBar);
      statsColor(defenseNum,defenseBar);
      statsColor(spAttackNum,spAttackBar);
      statsColor(spDefenseNum,spDefenseBar);
      statsColor(speedNum,speedBar);

////////////////////////*EV YIELD INNER HTML////////////////////

      const stats = data.stats

      const filteredStats = getEffortGreaterThanZero(stats);
      const EffortValue = document.getElementById('EffortValue');
      let htmlContent = '';

      for (const stat of filteredStats) {
        htmlContent += `<p>${stat.name}: ${stat.effort}</p>`;
      }
  
      EffortValue.innerHTML = htmlContent;

    } else {
      limpaCampos(Components)
    }

  }

form.addEventListener('submit', (event) => {
  event.preventDefault();   
  let value = input.value
  
  if(value > 644) {
    renderPokemon(0)
    input.value = ''
  } else {
    renderPokemon(input.value.toLowerCase());
  }
}
);

////////////////////////////////////* BUTTONS //////////////////////////////////

btnPrev.addEventListener('click' , () => {
  if (searchPokemon > 1) {
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
  }
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

notShinyIcon.addEventListener("click", () => {
  isShiny = !isShiny;
  
  if (isShiny) {
    notShinyIcon.src = '.shiny.svg';
  } else {
    notShinyIcon.src = ".notShiny.svg";
    }
  renderPokemon(searchPokemon);
});

////////////////////////////////////* FUNCTIONS //////////////////////////////////

const limpaCampos = (comp) => {
  comp.pokemonImage.style.display = Message.None;
  comp.pokemonName.innerHTML = Message.NotFound;
  comp.pokemonNumber.innerHTML = Message.XX;
  comp.type.innerHTML = Message.NotFound;
  comp.type.style.background = '#213547'
  comp.secondType.innerHTML = Message.NotFound;
  comp.secondType.style.background = '#213547'
  comp.description.innerHTML = Message.NotFound;
  comp.height.innerHTML = Message.NotFound;
  comp.weight.innerHTML = Message.NotFound;
  comp.ability.innerHTML = Message.NotFound;
  comp.hidenAbility.innerHTML = Message.NotFound;
  comp.held.innerHTML = Message.NotFound;
  comp.egg.innerHTML = Message.NotFound;
  comp.egg2.innerHTML = Message.NotFound;
  divStatsBars.style.display = Message.None;
  divStatsNum.style.display = Message.None;
  EffortValue.innerHTML = Message.None;
  input.value = '';
  type
}

class Message {
  static get NotFound(){
    return 'Not Found!'
  }
  static get None(){
    return 'None'
  }
  static get XX(){
    return 'XX'
  }
} 

function statsColor(num, bar) {
  if (num.innerHTML <= 30) {
    bar.style.background = '#f34444';
  } else if (num.innerHTML <= 60) {
    bar.style.background = '#ff7f0f';
  } else if (num.innerHTML <= 80) {
    bar.style.background = '#ffdd57';
  } else if (num.innerHTML <= 100) {
    bar.style.background = '#a0e515';
  } else if (num.innerHTML <= 125) {
    bar.style.background = '#23cd5e';
  } else if (num.innerHTML > 125) {
    bar.style.background = '#00c2b8';
  }
}


function getEffortGreaterThanZero(stats) {
  const result = [];

  for (const stat of stats) {
      if (stat.effort > 0) {
          result.push({
              name: stat.stat.name,
              effort: stat.effort
          });
      }
  }

  return result;
}

renderPokemon(searchPokemon);
