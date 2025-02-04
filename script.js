 const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const sprite = document.getElementById("sprite");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const typesContainer = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


const reset = () => {
     pokeName.textContent = "";
     pokeId.textContent = "";
     weight.textContent = "";
     height.textContent = "";
     sprite.style.display = "none";
     hp.textContent = "";
     attack.textContent = "";
     defense.textContent = "";
     specialAttack.textContent = "";
     specialDefense.textContent = "";
     speed.textContent = "";
     typesContainer.innerHTML = "";
     input.value = "";
};

//Search pokemon function
const searchPokemon = async () => {
  if (!input.value) {
    alert("Please enter a Pokémon name or ID!");
    reset();
        return;
  } 
     const cleanInput = input.value.toLowerCase();

    try {
     const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${cleanInput}`);
     if (!response.ok) throw new Error("Pokémon not found");

     const data = await response.json();

     pokeName.textContent = `${data.name.toUpperCase()}`;
     pokeId.textContent = `#${data.id}`;
     weight.textContent = `Weight: ${data.weight}`;
     height.textContent = `Height: ${data.height}`;
     sprite.style.display = "inline";
     sprite.src = data.sprites.front_default;
     sprite.alt = `image of ${data.name}`;


     hp.textContent = data.stats[0].base_stat;
     attack.textContent = data.stats[1].base_stat;
     defense.textContent = data.stats[2].base_stat;
     specialAttack.textContent = data.stats[3].base_stat;
     specialDefense.textContent = data.stats[4].base_stat;
     speed.textContent = data.stats[5].base_stat;

     typesContainer.innerHTML = "";
     data.types.forEach(typeInfo => {
            const typeElement = document.createElement("p");
            typeElement.textContent = typeInfo.type.name.toUpperCase();
            typesContainer.appendChild(typeElement);
        });
     
    }
    catch (error) {
      alert ("Pokémon not found");
      console.log(error);
      reset();
    }
  
};


//eventListeners
searchBtn.addEventListener("click", searchPokemon);
document.getElementById("search-input").addEventListener("keydown", e => {
  if(e.key === "Enter") {
    searchPokemon();
  }
});




