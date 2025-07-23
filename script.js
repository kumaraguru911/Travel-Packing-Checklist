const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const packingListDiv = document.getElementById("packing-list");

generateBtn.addEventListener("click", () => {
  const destination = document.getElementById("destination").value.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const weather = document.getElementById("weather").value;

  if (!destination || !startDate || !endDate || !weather) {
    alert("Please fill in all fields.");
    return;
  }
  if (new Date(endDate) < new Date(startDate)) {
    alert("End date must be after start date.");
    return;
  }

  const checklist = generatePackingList(weather);
  displayPackingList(checklist, destination, startDate, endDate);
});

// Clear button functionality
clearBtn.addEventListener("click", () => {
  document.getElementById("destination").value = '';
  document.getElementById("start-date").value = '';
  document.getElementById("end-date").value = '';
  document.getElementById("weather").value = '';
  packingListDiv.innerHTML = '';
});

// Essentials + weather
function generatePackingList(weather) {
  const baseItems = [
    "Passport / ID / Visa",
    "Travel tickets / boarding passes",
    "Wallet with cash & cards",
    "Phone & charger",
    "Medications & prescriptions",
    "Comfortable clothes & underwear",
    "Comfortable shoes",
    "Toiletries basics (toothbrush, toothpaste, deodorant, soap)",
    "Sunscreen",
    "Power bank",
    "Travel insurance documents",
    "Keys",
    "Face masks & hand sanitizer"
  ];

  let weatherItems = [];
  switch(weather) {
    case "sunny":
      weatherItems = ["Light clothing", "Swimsuit", "Hat", "Sunscreen"];
      break;
    case "rainy":
      weatherItems = ["Umbrella", "Raincoat", "Waterproof shoes"];
      break;
    case "cold":
      weatherItems = ["Warm coat", "Gloves", "Scarf", "Beanie"];
      break;
    case "mixed":
      weatherItems = ["Layered clothing", "Light jacket", "Umbrella"];
      break;
  }

  return [...baseItems, ...weatherItems];
}

// Display function
function displayPackingList(items, destination, start, end) {
  packingListDiv.innerHTML = `
    <h2>Packing Checklist for ${destination}</h2>
    <p><strong>Trip Dates:</strong> ${start} to ${end}</p>
  `;
  const ul = document.createElement("ul");

  items.forEach(item => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item;

    const label = document.createElement("label");
    label.htmlFor = item;
    label.textContent = item;

    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);
  });

  packingListDiv.appendChild(ul);
}
