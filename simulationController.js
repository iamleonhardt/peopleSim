// Simulator Controller
let currentPeopleArr = [];

canvas = document.getElementById("canvas");
c = canvas.getContext("2d");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 70;

let createPeople = () => {
  peopleArr.forEach((personData) => {
    currentPeopleArr.push(new Person(personData));
    console.log(personData.name + " says 'hi' 🙋‍♂️");
  });
};

let drawPerson = (person) => {
  c.fillStyle = person.color;
  c.beginPath();
  c.arc(person.x, person.y, 15, 0, 360);
  c.stroke();
  c.fill();
};

let drawPeople = () => {
  currentPeopleArr.forEach((person) => {
    drawPerson(person);
  });
};

let drawDistance = (person1, person2, distance) => {
  c.strokeStyle = "lightgrey";
  c.beginPath();
  c.moveTo(person1.x, person1.y);
  c.lineTo(person2.x, person2.y);
  c.stroke();
  c.font = "14px Arial";
  c.fillStyle = "lightgrey";
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
  return Math.floor(Math.sqrt(a * a + b * b));
};

let getAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    console.log("index is: " + i);
    currentPeopleArr.forEach((obj2, j) => {
      drawDistance(self, obj2, getDistance(self, obj2));
      j > i
        ? console.log(
            "Distance between " +
              self.name +
              " and " +
              obj2.name +
              " is " +
              getDistance(self, obj2)
          )
        : null;
    });
  });
};

let getRanNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Start Sim
let startSim = () => {
  createPeople();
  getAllDistances();
  drawPeople();
  actionQueue();
};

// Queue of Actions
let actionQueue = () => {
  currentPeopleArr[2].speak();
};
