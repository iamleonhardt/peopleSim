// Simulator Controller
let currentPeopleArr = [];
let ticker = 0;

// Inputs
let numOfPeopleInput = document.getElementById("numOfPeopleInput");
let showHistoryInput = document.getElementById("showHistoryInput");
let showPersonStatsInput = document.getElementById("showPersonStatsInput");
let drawDistancesInput = document.getElementById("drawDistancesInput");

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

// Setup Canvas
canvas = document.getElementById("canvas");
c = canvas.getContext("2d");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 70;

// Resize Canvas when browser resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 70;
  console.log("resizing");
});

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

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

let drawDistance = (person1, person2, distance) => {
  c.strokeStyle = "#444";
  c.beginPath();
  c.moveTo(person1.x, person1.y);
  c.lineTo(person2.x, person2.y);
  c.stroke();
  c.font = "10px Arial";
  c.fillStyle = "#fff";
  c.fillText(
    distance,
    (person1.x + person2.x) / 2,
    (person1.y + person2.y) / 2
  );
};

// Tools
let getDistance = (obj1, obj2) => {
  let a = obj1.x - obj2.x;
  let b = obj1.y - obj2.y;
  // check a and b if over a set value, then run the check - within hitbox range
  // make hitbox bigger than awareness to narrow it down

  let distance = Math.floor(Math.sqrt(a * a + b * b));
  distance < 150
    ? (obj1.addToAwareness(obj2), obj2.addToAwareness(obj1))
    : null;
  return distance;
};

let drawAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    currentPeopleArr.forEach((obj2, j) => {
      j > i ? drawDistance(self, obj2, getDistance(self, obj2)) : null;
    });
  });
};

let getAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    currentPeopleArr.forEach((obj2, j) => {
      j > i ? getDistance(self, obj2) : null;
    });
  });
};

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

let moveAllPeopleRan = () => {
  currentPeopleArr.forEach((person) => {
    person.update();
  });
};

// Start Sim
let startSim = () => {
  createPeople(numOfPeopleInput.value);
  getAllDistances();
  drawPeople();
  actionQueue();
  updateRequest = requestAnimationFrame(update);
};

// Queue of Actions
let actionQueue = () => {
  // currentPeopleArr[2].speak();
};

let stopSim = () => {
  cancelAnimationFrame(updateRequest);
};

let clearSim = () => {
  currentPeopleArr = [];
  c.clearRect(0, 0, canvas.width, canvas.height);
};

let clearFrame = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
};

let updateRequest;

let update = () => {
  // Show History Checked
  // Hide distance
  // Hide person stats
  // dont clear frame
  !showHistoryInput.checked ? clearFrame() : null;

  moveAllPeopleRan();

  // Show Distances checked
  // Draw distances, else just get distances
  drawDistancesInput.checked ? drawAllDistances() : getAllDistances();

  // Show Person Stats Checked
  // Draw person stats,
  showPersonStatsInput.checked ? drawPeopleWithStats() : drawPeople();

  ticker++;
  updateRequest = requestAnimationFrame(update);
};
