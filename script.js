"use strict";

// Create an array to store plant objects.
let plants = [];
console.log(plants);

// Function to display plants on the webpage
function displayPlants() {
  const plantList = document.getElementById("plantList");
  plantList.innerHTML = "";

  // Loop through each plant and create a list item with details and a remove button
  plants.forEach((plant, i) => {
    const li = document.createElement("li");

    li.innerHTML = `<p>Name: ${plant.name}</p> 
    <p>Species: ${plant.species}</p>
    <p>Watering Schedule: ${plant.waterSchedule}</p>
    <button id="remBtn${i}">Remove Plant</button>`;

    li.id = "li" + i;
    plantList.appendChild(li);

    // Add event listener to remove button to remove the plant from the list and update localStorage
    document.querySelector(`#remBtn${i}`).addEventListener("click", () => {
      document.querySelector(`#li` + i).remove();
      let newPlants = plants.splice(i, 1);
      localStorage.setItem("plants", JSON.stringify(plants));
    });
  });
}

// Load plants from localStorage or initialize an empty array if no plants are saved
let rawPlants = localStorage.getItem("plants");
plants = JSON.parse(rawPlants) || [];

// Manually invoke displayPlants() to display the plants initially
displayPlants();

// Function to add a new plant to the array and update the display
function addPlant(name, species, waterSchedule) {
  const newPlant = { name, species, waterSchedule };
  plants.push(newPlant);

  // Save the updated plants array to localStorage
  localStorage.setItem("plants", JSON.stringify(plants));
}

// Function to handle form submission and add a new plant
function addPlantFromForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get values from the form fields
  const name = plantForm.name.value;
  const species = plantForm.species.value;
  const waterSchedule = plantForm.waterSchedule.value;

  // Add the new plant, update display, and reset the form
  addPlant(name, species, waterSchedule);
  displayPlants();
  plantForm.reset();
}

// Add an event listener to the form to handle submissions
const plantForm = document.getElementById("plant-form");
plantForm.addEventListener("submit", addPlantFromForm);
