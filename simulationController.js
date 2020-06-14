// Simulator Controller
let currentPeopleArr = [];

let createPeople = () => {
  peopleArr.forEach((personData) => {
    currentPeopleArr.push(new Person(personData));
    console.log(personData.name + " says 'hi' 🙋‍♂️");
  });
};

// Tools
let getDistance = (obj1, obj2) => {
  let a = obj1.x - obj2.x;
  let b = obj1.y - obj2.y;
  return Math.floor(Math.sqrt(a * a + b * b));
};

let getRanNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let startSim = () => {
  createPeople();
  actionQueue();
};

// Queue of Actions
let actionQueue = () => {
  currentPeopleArr[2].speak();
};

/*
distance between
A B
A C
A D
B C
B D
C D

loop through current people
get distance between self and anyone further down array

print distance as "Distance between self.nam and obj2.name is: x"
*/

let getAllDistances = () => {
  currentPeopleArr.forEach((self, i) => {
    console.log("index is: " + i);
    currentPeopleArr.forEach((obj2, j) => {
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

    // getDistance(self, obj2);g
  });
};
