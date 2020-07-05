let currentPeopleArr = [];
let ticker = 0;
let updateRequest;
let selectedPeopleMap = {};

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

// Define Inputs
let numOfPeopleInput = document.getElementById("numOfPeopleInput");
let showHistoryInput = document.getElementById("showHistoryInput");
let showPersonStatsInput = document.getElementById("showPersonStatsInput");
let drawDistancesInput = document.getElementById("drawDistancesInput");
let detailsInput = document.getElementById("detailsSidePane");

// EVENT HANDLERS
numOfPeopleInput.addEventListener("keyup", (e) => {
  e.which === 13
    ? (event.preventDefault(), document.getElementById("startSimBtn").click())
    : null;
});

let showHistoryInputClicked = () => {
  if (showHistoryInput.checked) {
    showPersonStatsInput.disabled = true;
    drawDistancesInput.disabled = true;
    showPersonStatsInput.checked = false;
    drawDistancesInput.checked = false;
  } else {
    showPersonStatsInput.disabled = false;
    drawDistancesInput.disabled = false;
  }
};

// CANVAS SETUP
canvas = document.getElementById("canvas");
c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 66;

// Resize Canvas when browser resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 66;
  console.log("resizing");
});

let resizeCanvas = () => {
  if (detailsInput.checked) {
    canvas.width = window.innerWidth - 400;
    console.log("resizing");
  } else {
    canvas.width = window.innerWidth;
    console.log("resizing");
  }
};

// TOOLS
let getRanNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let getRanColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// PEOPLE CREATION
let createPeople = (numberOfPeople) => {
  for (i = 0; i < numberOfPeople; i++) {
    currentPeopleArr.push(new Person(peopleArr[i], i));
    console.log(peopleArr[i] + " says 'hi' 🙋‍♂️");
  }
};

let drawPeople = () => {
  currentPeopleArr.forEach((person) => {
    person.drawSelf();
  });
};

let drawPeopleWithStats = () => {
  currentPeopleArr.forEach((person) => {
    person.drawSelf();
    person.drawSelfStats();
  });
};

// DISTANCES
let getDistance = (obj1, obj2) => {
  let a = obj1.x - obj2.x;
  let b = obj1.y - obj2.y;
  // check a and b if over a set value, then run the check - within hitbox range
  // make hitbox bigger than awareness to narrow it down

  let distance = Math.floor(Math.sqrt(a * a + b * b));
  if (distance < 180) {
    if (distance < 150) {
      obj1.awareOfNewPerson(obj2);
      obj2.awareOfNewPerson(obj1);
    } else {
      obj1.removeFromAwareness(obj2.id);
      obj2.removeFromAwareness(obj1.id);
    }
  }
  return distance;
};

let getAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    currentPeopleArr.forEach((obj2, j) => {
      j > i ? getDistance(self, obj2) : null;
    });
  });
};

let drawDistance = (person1, person2, distance) => {
  c.strokeStyle = "#d3d3d3";
  c.beginPath();
  c.moveTo(person1.x, person1.y);
  c.lineTo(person2.x, person2.y);
  c.stroke();
  c.font = "14px Arial";
  c.fillStyle = "#9e9e9e";
  c.fillText(
    distance,
    (person1.x + person2.x) / 2,
    (person1.y + person2.y) / 2
  );
};

let drawAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    currentPeopleArr.forEach((obj2, j) => {
      j > i ? drawDistance(self, obj2, getDistance(self, obj2)) : null;
    });
  });
};

// SIM CONTROLS
let startSim = () => {
  createPeople(numOfPeopleInput.value);
  updateSim();
};

let stopSim = () => {
  cancelAnimationFrame(updateRequest);
};

let clearSim = () => {
  currentPeopleArr = [];
  clearFrame();
};

let clearFrame = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
};

let updateSim = () => {
  // Show History Checkbox
  !showHistoryInput.checked ? clearFrame() : null;
  // Show Distances checkbox
  drawDistancesInput.checked ? drawAllDistances() : getAllDistances();
  // Show Person Stats Checkbox
  showPersonStatsInput.checked ? drawPeopleWithStats() : drawPeople();
  //Update All People
  currentPeopleArr.forEach((person) => {
    person.update();
  });

  ticker++;
  updateRequest = requestAnimationFrame(updateSim);
};
