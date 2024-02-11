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
  event.preventDefault(); // Prevent page refresh

  // Get values from the form fields
  const plantName = plantForm.name.value;
  const plantSpecies = plantForm.species.value;
  const waterSchedule = plantForm.waterSchedule.value;

  // Add the new plant, update display, and reset the form
  addPlant(plantName, plantSpecies, waterSchedule);
  displayPlants();
  plantForm.reset();
}

// Add an event listener to the form to handle submissions
const plantForm = document.getElementById("plant-form");

// Form Validation
// plantForm.addEventListener("submit", (event) => {
//   const plantName = plantForm.name.value;
//   if (plantName.length < 5 || plantName.length > 30) {
//     alert("Plant names must be between 5 and 30 characters long.");
//     return;
//   }
// });

// plantForm.addEventListener("submit", (event) => {
//   const plantSpecies = plantForm.species.value;
//   if (plantSpecies.length < 5 || plantSpecies.length > 30) {
//     alert("Plant species must be between 5 and 30 characters long.");
//     return;
//   }
// });

// plantForm.addEventListener("submit", (event) => {
//   const waterSchedule = plantForm.waterSchedule.value;
//   if (waterSchedule.length < 3 || waterSchedule.length > 33) {
//     alert("Water schedules must be between 3 and 27 characters long.");
//     return;
//   }
// });

// Had trouble with putting the above event listeners into one code block. Ran the code through chatGPT. Results below.
plantForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  const plantName = plantForm.name.value;
  const plantSpecies = plantForm.species.value;
  const waterSchedule = plantForm.waterSchedule.value;

  // Perform validation for each input field
  if (plantName.length < 5 || plantName.length > 30) {
    alert("Plant names must be between 5 and 30 characters long.");
  } else if (plantSpecies.length < 5 || plantSpecies.length > 30) {
    alert("Plant species must be between 5 and 30 characters long.");
  } else if (waterSchedule.length < 3 || waterSchedule.length > 33) {
    alert("Water schedules must be between 3 and 33 characters long.");
  } else {
    // If all validations pass, submit the form
    addPlantFromForm(event);
  }
});
