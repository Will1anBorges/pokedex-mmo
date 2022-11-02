
const pokemonName = document.querySelector('.poke-name');
const pokemonNumber = document.querySelector('.poke-number');
const pokemonImage = document.querySelector('.poke-img');
const input = document.querySelector('.input-search');
const form = document.querySelector('.form');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

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
  
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id >= 644 ? data.id = 0 : data.id
    input.value = '';
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not founded!';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  
  let value = input.value
  
  if(value > 644) {
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

  
  } else {
    renderPokemon(input.value.toLowerCase());
}});

btnPrev.addEventListener('click' , () => {
  if (searchPokemon > 1) {
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
} else if (searchPokemon == 0) {
  renderPokemon(643)
} else {renderPokemon(644)}});
  
btnNext.addEventListener('click' , () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);


//150 151 377-386 480-494 638-643