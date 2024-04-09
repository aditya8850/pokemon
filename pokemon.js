// Function to fetch a random Pokemon
function fetchRandomPokemon() {
    return fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(data => {
        const pokemonList = data.results;
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon = pokemonList[randomIndex];
        return randomPokemon;
      });
  }
  
  // Function to fetch Pokemon details by name
  function fetchPokemonDetails(pokemonName) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json());
  }
  
  // Function to render Pokemon details in the player's container
  function renderPokemon(playerContainerId) {
    const playerContainer = document.getElementById(playerContainerId);
    return fetchRandomPokemon()
      .then(randomPokemon => fetchPokemonDetails(randomPokemon.name))
      .then(pokemonDetails => {
        const playerNameElement = playerContainer.querySelector(".name");
        const playerExperienceElement = playerContainer.querySelector(".experience");
        const playerAbilitiesElement = playerContainer.querySelector(".abilities");
        const playerImageElement = playerContainer.querySelector(".img");
  
        playerNameElement.textContent = pokemonDetails.name;
        playerExperienceElement.textContent = `Experience: ${pokemonDetails.base_experience}`;
        playerAbilitiesElement.innerHTML = "";
        pokemonDetails.abilities.forEach(ability => {
          const li = document.createElement("li");
          li.textContent = ability.ability.name;
          playerAbilitiesElement.appendChild(li);
        });
        playerImageElement.innerHTML = `<img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">`;
      });
  }
  
  // Function to update scores based on the fight outcome
  function updateScores() {
    const player1Experience = parseInt(document.querySelector("#player1 .experience").textContent.split(":")[1]);
    const player2Experience = parseInt(document.querySelector("#player2 .experience").textContent.split(":")[1]);
    
    const player1ScoreElement = document.getElementById("p1_score");
    const player2ScoreElement = document.getElementById("p2_score");
   
    player1ScoreElement.textContent= parseInt(player1ScoreElement.textContent.split(":")[1]);
    player2ScoreElement.textContent = parseInt(player2ScoreElement.textContent.split(":")[1]) 
    if (player1Experience > player2Experience) {
        player1ScoreElement.textContent="win";
        if(player1ScoreElement.textContent==="win"){
            player2ScoreElement.textContent="loss"
        }
    } else if (player2Experience > player1Experience) {
      player2ScoreElement.textContent ="win";
      player1ScoreElement.textContent='loss'
  
    }
    else{
        player1ScoreElement.textContent="draw";
    player2ScoreElement.textContent="draw";

    }
    
  }
  
  // Event listener for the Fight button
  document.getElementById("fight").addEventListener("click", function() {
    Promise.all([renderPokemon("player1"), renderPokemon("player2")])
      .then(() => updateScores());
  });
  
  // Initial rendering of Pokemon for each player
  Promise.all([renderPokemon("player1"), renderPokemon("player2")]);
