"use strict";

// Start with a hardcoded plant object, similar to the exampleBook in the demo.
const examplePlant = {
  name: "Rosemary",
  species: "Salvia rosmarius",
  waterSchedule: "Mon, Thurs, Sat",
};

// Create an array to store plant objects.
const plants = [];

// Add your hardcoded plant to this array.
plants.push(examplePlant);
console.log(plants);

// Write a function displayPlants() that will display each plant in the array as an item in an unordered list on the webpage.
function displayPlants() {
  const plantList = document.getElementById("plantList");
  plantList.innerHTML = "";

  plants.forEach((plant) => {
    const li = document.createElement("li");

    li.innerHTML = `<p>Name: ${plant.name}</p> 
    <p>Species: ${plant.species}</p>
    <p>Watering Schedule: ${plant.waterSchedule}</p>`;
    plantList.appendChild(li);
  });
}

// Manually invoke displayPlants() to test displaying the hardcoded plant.
displayPlants();

// Write a function addPlant(name, species, waterSchedule) that adds a new plant object to the array and updates the display.
function addPlant(name, species, waterSchedule) {
  const newPlant = { name, species, waterSchedule };
  plants.push(newPlant);
}

// Test addPlant function by manually adding a plant and invoking displayPlants().
addPlant("Peppermint", "Mentha piperita L.", "Mon, Wed, Sat");
displayPlants();

const plantForm = document.getElementById("plant-form");

function addPlantFromForm(event) {
  // Ensure the form prevents the default submission action and clears its fields after adding a plant.
  event.preventDefault();

  const name = plantForm.name.value;
  const species = plantForm.species.value;
  const waterSchedule = plantForm.waterSchedule.value;

  addPlant(name, species, waterSchedule);
  displayPlants();
  // Ensure the form prevents the default submission action and clears its fields after adding a plant.
  plantForm.reset();
}

// Add an event listener to the form to handle submissions using the addPlant function.
plantForm.addEventListener("submit", addPlantFromForm);