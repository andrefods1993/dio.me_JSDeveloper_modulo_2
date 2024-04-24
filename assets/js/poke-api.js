// Objeto para interagir com a PokeAPI
const pokeApi = {};

// Função para criar um objeto Pokemon com base nos detalhes fornecidos pela PokeAPI
function createPokemon(pokemonDetail) {
	const pokemon = new Pokemon(); // Cria uma instância de Pokemon
	const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name); // Extrai os tipos do Pokémon

	// Define as propriedades do Pokémon com os detalhes fornecidos
	pokemon.id = pokemonDetail.id.toString().padStart(4, '0'); // Formata o ID do Pokémon
	pokemon.name = pokemonDetail.name; // Nome do Pokémon
	pokemon.types = types; // Tipos do Pokémon
	pokemon.mainType = types[0]; // Tipo principal do Pokémon
	pokemon.photo = pokemonDetail.sprites.other.home.front_default; // Foto do Pokémon
	pokemon.height = pokemonDetail.height; // Altura do Pokémon
	pokemon.weight = pokemonDetail.weight; // Peso do Pokémon
	pokemon.hp = pokemonDetail.stats[0].base_stat; // Pontos de Vida (HP) do Pokémon
	pokemon.attack = pokemonDetail.stats[1].base_stat; // Ataque do Pokémon
	pokemon.defense = pokemonDetail.stats[2].base_stat; // Defesa do Pokémon
	pokemon.specialAttack = pokemonDetail.stats[3].base_stat; // Ataque Especial do Pokémon
	pokemon.specialDefense = pokemonDetail.stats[4].base_stat; // Defesa Especial do Pokémon
	pokemon.speed = pokemonDetail.stats[5].base_stat; // Velocidade do Pokémon

	return pokemon; // Retorna o objeto Pokémon criado
}

// Método para obter detalhes de um Pokémon da PokeAPI
pokeApi.getPokemonDetail = (pokemon) => {
	return fetch(pokemon.url) // Faz uma solicitação GET para a URL do Pokémon
		.then((response) => response.json()) // Converte a resposta em JSON
		.then(createPokemon); // Chama a função createPokemon para criar um objeto Pokémon
};

// Método para obter uma lista de Pokémon da PokeAPI com deslocamento e limite opcionais
pokeApi.getPokemons = (offset = 0, limit = 6) => {
	// Constrói a URL da API com base no deslocamento e limite fornecidos
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

	// Envia uma solicitação GET para a URL da API usando fetch
	return fetch(url)
		.then((response) => response.json()) // Converte a resposta em JSON
		.then((jsonBody) => jsonBody.results) // Extrai a lista de resultados da resposta JSON
		.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia os Pokémon para obter detalhes de cada um
		.then((detailRequests) => Promise.all(detailRequests)) // Aguarda a resolução de todas as solicitações de detalhes
		.then((pokemonsDetails) => pokemonsDetails); // Retorna a lista de detalhes dos Pokémon
};

pokeApi.getPokemon = (pokemonId) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

	return fetch(url)
		.then((response) => response.json())
		.then(createPokemon);
};

pokeApi.getPokemonEvolutions = (pokemonId = 1) => {
	const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

	return fetch(url)
		.then((response) => response.json())
		.then((jsonBody) => jsonBody.evolution_chain.url)
		.then((evolutionUrl) =>
			fetch(evolutionUrl).then((response) => response.json())
		);
};

function createEvolutions(results) {
	const speciesNames = [];
	// Adiciona o nome da espécie principal à array
	speciesNames.push(results.chain.species.name);

	// Percorre as evoluções para adicionar os nomes das espécies à array
	let nextEvolutions = results.chain.evolves_to;
	while (nextEvolutions.length > 0) {
		nextEvolutions = nextEvolutions
			.map((evolution) => {
				speciesNames.push(evolution.species.name);
				return evolution.evolves_to;
			})
			.flat();
	}

	return speciesNames;
}
