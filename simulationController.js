// Simulator Controller
let currentPeopleArr = [];
let ticker = 0;

canvas = document.getElementById("canvas");
c = canvas.getContext("2d");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 70;

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let createPeople = (numberOfPeople) => {
  for (i = 0; i < numberOfPeople; i++) {
    currentPeopleArr.push(new Person(peopleArr[i]));
    console.log(peopleArr[i] + " says 'hi' 🙋‍♂️");
  }
};

let drawPerson = (person) => {
  c.fillStyle = person.color;
  c.beginPath();
  c.arc(person.x, person.y, person.radius, 0, 360);
  c.stroke();
  c.fill();

  c.font = "14px Arial";
  c.fillStyle = "darkgrey";
  c.fillText(person.name, person.x + person.radius + 8, person.y);
  c.fillText(
    "e: " + person.emotionLevel,
    person.x + person.radius + 8,
    person.y + 14
  );

  person.chatBubble[0] ? drawChatBubble(person) : null;
  person.chatTimer === ticker ? person.chatBubble.pop() : null;
};

let drawChatBubble = (person) => {
  let text = c.measureText(person.chatBubble);
  c.fillStyle = "white";
  c.beginPath();
  c.fillRect(person.x - 24 - text.width, person.y - 12, text.width + 8, 22);
  c.stroke();
  c.fill();

  c.font = "14px Arial";
  c.fillStyle = "darkgrey";
  c.fillText(person.chatBubble[0], person.x - 20 - text.width, person.y + 4);
};

let drawPeople = () => {
  currentPeopleArr.forEach((person) => {
    drawPerson(person);
  });
};

let drawDistance = (person1, person2, distance) => {
  c.strokeStyle = "#e3e3e3";
  c.beginPath();
  c.moveTo(person1.x, person1.y);
  c.lineTo(person2.x, person2.y);
  c.stroke();
  c.font = "10px Arial";
  c.fillStyle = "darkgrey";
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
  let distance = Math.floor(Math.sqrt(a * a + b * b));
  distance < 150 ? (obj1.awareArr.push(obj2), obj2.awareArr.push(obj1)) : null;
  return distance;
};

let getAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    currentPeopleArr.forEach((obj2, j) => {
      j > i ? drawDistance(self, obj2, getDistance(self, obj2)) : null;
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

let getEmotionColor = (emotionLevel) => {
  switch (emotionLevel) {
    case 5:
      return "#66af2e";
    case 4:
      return "#82b230";
    case 3:
      return "#a1b235";
    case 2:
      return "#bdb336";
    case 1:
      return "#dbb53a";
    case 0:
      return "#f8b63e";
    case -1:
      return "#f6a13e";
    case -2:
      return "#f1893f";
    case -3:
      return "#ec723c";
    case -4:
      return "#ea603c";
    case -5:
      return "#e6483d";
  }
};

// Start Sim
let startSim = () => {
  createPeople(4);
  getAllDistances();
  drawPeople();
  actionQueue();
  updateRequest = requestAnimationFrame(update);
};

// Queue of Actions
let actionQueue = () => {
  // currentPeopleArr[2].speak();
};

let moveAllPeopleRan = () => {
  currentPeopleArr.forEach((person) => {
    person.x += getRanNum(-2, 2);
    person.y += getRanNum(-2, 2);
  });
};

let updateRequest;

let update = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
  moveAllPeopleRan();
  getAllDistances();
  drawPeople();

  ticker++;
  updateRequest = requestAnimationFrame(update);
};

let stopSim = () => {
  cancelAnimationFrame(updateRequest);
};

let clearSim = () => {
  currentPeopleArr = [];
  c.clearRect(0, 0, canvas.width, canvas.height);
};
