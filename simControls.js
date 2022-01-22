// Define Inputs
let addPeopleBtn = document.getElementById("addPeopleBtn");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let clearBtn = document.getElementById("clearBtn");



let numOfPeopleInput = document.getElementById("numOfPeopleInput");
let showHistoryInput = document.getElementById("showHistoryInput");
let showPersonStatsInput = document.getElementById("showPersonStatsInput");
let drawDistancesInput = document.getElementById("drawDistancesInput");
let detailsInput = document.getElementById("detailsSidePane");



// SIM CONTROLS
let addNPCs = () => {
    createPeople(numOfPeopleInput.value);
  };
  
  let startSim = () => {
    updateRequest = requestAnimationFrame(updateSim);
    playBtn.disabled = true;
    pauseBtn.disabled = false;
  };
  
  let stopSim = () => {
    cancelAnimationFrame(updateRequest);
    pauseBtn.disabled = true;
    playBtn.disabled = false;
  };
  
  let clearSim = () => {
    currentPeopleArr = [];
    clearFrames();
  };
  
  

  let drawPeople = () => {
    currentPeopleArr.forEach((person) => {
      person.drawSelf();
      person.drawWander();
    });
  };
  
  let drawPeopleStats = () => {
    currentPeopleArr.forEach((person) => {
      person.drawSelfStats();
    });
  };
  
  let drawPeopleAwarenessRange = () => {  
    currentPeopleArr.forEach((person) => {
    person.drawSelfAwareRange();
  });
  
  }