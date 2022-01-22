let currentPeopleArr = [];
let ticker = 0;
let updateRequest;
let selectedPeopleMap = {};

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

// CANVAS SETUP
canvasPeople = document.getElementById("canvasPeople");
cPeople = canvasPeople.getContext("2d");
canvasPeople.width = window.innerWidth;
canvasPeople.height = window.innerHeight - 66;

canvasData = document.getElementById("canvasData");
cData = canvasData.getContext("2d");
canvasData.width = window.innerWidth;
canvasData.height = window.innerHeight - 66;

canvasMeasurements = document.getElementById("canvasMeasurements");
cMeasurements = canvasMeasurements.getContext("2d");
canvasMeasurements.width = window.innerWidth;
canvasMeasurements.height = window.innerHeight - 66;

// Resize Canvas when browser resizes
window.addEventListener("resize", () => {
  canvasPeople.width = window.innerWidth;
  canvasPeople.height = window.innerHeight - 66;
  canvasData.width = window.innerWidth;
  canvasData.height = window.innerHeight - 66;
  canvasMeasurements.width = window.innerWidth;
  canvasMeasurements.height = window.innerHeight - 66;
});

// Resize Canvas when Details Pane opens
let resizeCanvas = () => {
  if (detailsInput.checked) {
    canvasPeople.width = window.innerWidth - 400;
    canvasData.width = window.innerWidth - 400;
    canvasMeasurements.width = window.innerWidth - 400;
  } else {
    canvasPeople.width = window.innerWidth;
    canvasData.width = window.innerWidth;
    canvasMeasurements.width = window.innerWidth;
  }
};

let showPeopleCount = () => {
  cMeasurements.font = "14px Arial";
  cMeasurements.fillStyle = "#9e9e9e";
  cMeasurements.fillText(
    "Current People " + currentPeopleArr.length, 8, 24
  );
}

let clearPeopleFrame = () => {
  cPeople.clearRect(0, 0, canvasPeople.width, canvasPeople.height);
};

let clearDataFrame = () => {
  cData.clearRect(0, 0, canvasData.width, canvasData.height);
};

let clearMeasurementsFrame = () => {
  cMeasurements.clearRect(0, 0, canvasMeasurements.width, canvasMeasurements.height);
};

let clearFrames = () => {
  cData.clearRect(0, 0, canvasData.width, canvasData.height);
  cPeople.clearRect(0, 0, canvasPeople.width, canvasPeople.height);
  cMeasurements.clearRect(0, 0, canvasMeasurements.width, canvasMeasurements.height);

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
    console.log(peopleArr[i] + " was born  🙋‍♂️");
  }
};

// DISTANCES
let getDistance = (obj1, obj2) => {
  let a = obj1.pos.x - obj2.pos.x;
  let b = obj1.pos.y - obj2.pos.y;
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
  cMeasurements.strokeStyle = "#e3e3e3";
  cMeasurements.beginPath();
  cMeasurements.moveTo(person1.pos.x, person1.pos.y);
  cMeasurements.lineTo(person2.pos.x, person2.pos.y);
  cMeasurements.stroke();
  cMeasurements.font = "14px Arial";
  cMeasurements.fillStyle = "#9e9e9e";
  cMeasurements.fillText(
    distance,
    (person1.pos.x + person2.pos.x) / 2,
    (person1.pos.y + person2.pos.y) / 2
  );
};

let drawAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    currentPeopleArr.forEach((obj2, j) => {
      j > i ? drawDistance(self, obj2, getDistance(self, obj2)) : null;
    });
  });
};

// EVENT HANDLERS
numOfPeopleInput.addEventListener("keyup", (e) => {
  e.which === 13
    ? (event.preventDefault(), document.getElementById("startSimBtn").click())
    : null;
});


let updateSim = () => {
  !showHistoryInput.checked ? clearFrames() : clearDataFrame(), clearMeasurementsFrame();
  drawPeople();
  drawDistancesInput.checked ? drawAllDistances() : getAllDistances();
  showPersonStatsInput.checked ? drawPeopleStats() : null;
  showAwarenessRangeInput.checked ? drawPeopleAwarenessRange() : null;
  showPeopleCount();

  //Update All People
  currentPeopleArr.forEach((person) => {
    person.update();
  });

  ticker++;
  updateRequest = requestAnimationFrame(updateSim);
};

updateRequest = requestAnimationFrame(updateSim);
