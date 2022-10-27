
const pokemonName = document.querySelector('.poke-name');
const pokemonNumber = document.querySelector('.poke-number');
const pokemonImage = document.querySelector('.poke-img');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
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
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not founded!';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click' , () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener('click' , () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);