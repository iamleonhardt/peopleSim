class Person {
  constructor(name, i) {
    this.name = name;
    this.id = name + "_" + i;
    this.emotionLevel = getRanNum(-5, 5);
    this.radius = getRanNum(8, 16);
    // this.x = getRanNum(0 + this.radius, canvasPeople.width);
    // this.y = getRanNum(0 + this.radius, canvasPeople.height);
    this.pos = {
      x: getRanNum(0 + this.radius, canvasPeople.width), 
      y: getRanNum(0 + this.radius, canvasPeople.height)
    };
    this.vel = {x: 0, y: 0};
    this.acc = {x: 0, y: 0};
    this.speed = getRanNum(0, 4);
    this.maxSpeed = 4;
    this.maxForce = .025;
    this.color = this.getEmotionColor(this.emotionLevel);
    this.speakArr = []; // {words: "string", removeTime: num}
    this.chatTimer = 0;
    this.socialDistance = 150;
    this.awareDistance = 150;
    this.awarenessMap = {}; // {personId : {durationOfAwareness: num of how long im aware of them, person: personObj}}
    this.longTermAwarenessMap = {}; // {personId: {lastAwareTimestamp: num, person: personObj}}
    this.resilience = getRanNum(1, 15);
  }

  getID = () => {
    return this.id;
  };

  changeEmotionLevel = (diff) => {
    this.emotionLevel += diff;
    this.emotionLevel > 5 ? (this.emotionLevel = 5) : null;
    this.emotionLevel < -5 ? (this.emotionLevel = -5) : null;
  };

  getEmotionColor = (emotionLevel) => {
    switch (emotionLevel) {
      case 5:
        return "#2DB4E0";
      case 4:
        return "#71CCEB";
      case 3:
        return "#95D9F0";
      case 2:
        return "#B8E5F5";
      case 1:
        return "#DCF3FA";
      //Neutral
      case 0:
        return "#fff";
      case -1:
        return "#FADBE0";
      case -2:
        return "#F5B8C1";
      case -3:
        return "#F094A2";
      case -4:
        return "#EB7083";
      case -5:
        return "#E12D48";
    }
  };

  // AWARENESS
  addToAwarenessMap = (personObj) => {
    this.awarenessMap[personObj.getID()] = {
      durationOfAwareness: 0,
      person: personObj,
    };
  };

  addToLongTermAwarenessMap = (personObj) => {
    this.longTermAwarenessMap[personObj.getID()] = {
      lastAwareTimestamp: 0,
      person: personObj,
    };
  };

  awareOfNewPerson = (personObj) => {
    let id = personObj.getID();
    // Check if aware
    if (!this.awarenessMap.hasOwnProperty(id)) {
      this.addToAwarenessMap(personObj);
      // Check if met person before
      if (!this.longTermAwarenessMap.hasOwnProperty(id)) {
        // If not, meet them and greet them
        this.addToLongTermAwarenessMap(personObj);
        this.addMessage("Hello, stranger");
      } else {
        // If you have met them before,
        // Check how long its been since seen them, 
        // if longer than X, greet
        if (this.longTermAwarenessMap[id].lastAwareTimestamp > 4500) {
          this.addMessage("Hello, " + personObj.name);
        } else if (this.longTermAwarenessMap[id].lastAwareTimestamp > 2000) {
          this.addMessage("Oh, hey");
          // this.longTermAwarenessMap[id].lastAwareTimestamp = 0;
        }

        // Then set to 0
        this.longTermAwarenessMap[id].lastAwareTimestamp = 0;
      }
    } else {
      this.awarenessMap[id].durationOfAwareness++;
    }
  };

  removeFromAwareness = (personid) => {
    this.awarenessMap.hasOwnProperty(personid)
      ? delete this.awarenessMap[personid]
      : null;

    this.longTermAwarenessMap.hasOwnProperty(personid)
      ? (this.longTermAwarenessMap[personid].lastAwareTimestamp = ticker)
      : null;
  };

  // DRAW CANVAS ELEMENTS
  drawSelf = () => {
    cPeople.fillStyle = this.getEmotionColor(this.emotionLevel);
    cPeople.beginPath();
    cPeople.moveTo(this.pos.x+this.radius, this.pos.y); // Front of triangle
    cPeople.lineTo(this.pos.x-this.radius, this.pos.y - (this.radius-(this.radius / 3))); // Right side of triangle
    cPeople.lineTo(this.pos.x-this.radius, this.pos.y + (this.radius-(this.radius / 3))); // Left side of triangle
    cPeople.lineTo(this.pos.x+this.radius, this.pos.y); // Back to front of triangle

    cPeople.strokeStyle = "#999";
    cPeople.stroke();
    cPeople.fill();
  };

  drawWander = () => {
    // Wander Point
    let wanderPoint = {x: this.pos.x + 80, y: this.pos.y}
    cData.fillStyle = 'rgba(255, 0, 0, 0)';
    cData.beginPath();
    cData.arc(wanderPoint.x, wanderPoint.y, 4, 0, 360);
    cData.strokeStyle = "#aaa";
    cData.stroke();
    cData.fill();

    // Wander Radius
    let wanderRadius = 24;
    cData.fillStyle = 'rgba(0, 140, 140, 0)';
    cData.beginPath();
    cData.arc(wanderPoint.x, this.y, wanderRadius, 0, 360);
    cData.strokeStyle = "#aaa";
    cData.stroke();
    cData.fill();

    let theta = getRanNum(0, 360);

    let x = wanderRadius * Math.cos(theta);
    let y = wanderRadius * Math.sin(theta);
    console.log("x is: ", x, " and y is: ", y);
    cData.beginPath();
    wanderPoint.x += x;
    wanderPoint.y += y;
    cData.arc(wanderPoint.x, wanderPoint.y, 4,  0, 360);
    cData.fillStyle = '#b3d9d9';
    cData.fill();

    // Steering force = wanderpoint pos - person posision;
    let steer = {x: wanderPoint.x - this.pos.x, y: wanderPoint.y - this.pos.y};
    this.applyForce(steer);

  }

  applyForce = (force) => {
    this.acc.x += force.x;
    this.acc.y += force.y;
  }

  drawSelfAwareRange = ()=> { 
    cData.fillStyle = 'rgba(255, 0, 0, 0)';
    cData.beginPath();
    cData.arc(this.pos.x, this.pos.y, this.awareDistance, 0, 360);
    cData.strokeStyle = "#ddd";
    cData.stroke();
    cData.fill();
  }

  drawSelfStats = () => {
    cData.beginPath();
    cData.font = "14px Arial";
    cData.fillStyle = "#999";
    cData.fillText(this.name, this.pos.x + this.radius + 8, this.pos.y);
    cData.fillText(
      "E Level: " + this.emotionLevel,
      this.pos.x + this.radius + 8,
      this.pos.y + 14
    );
    cData.fillText ("Aware of: " + Object.keys(this.longTermAwarenessMap).length, this.pos.x + this.radius + 8,
    this.pos.y + 28)
  };

  drawSpeechBubble = (text, i) => {
    let textWidth = cData.measureText(text).width;
    cData.fillStyle = "white";
    cData.beginPath();
    cData.fillRect(
      this.pos.x - 24 - textWidth,
      this.pos.y - 12 + i * 24,
      textWidth + 8,
      22
    );
    cData.stroke();
    cData.fill();

    cData.font = "14px Arial";
    cData.fillStyle = "darkgrey";
    cData.fillText(text, this.pos.x - 20 - textWidth, this.pos.y + 4 + i * 24);
  };

  speak() {
    this.speakArr.map((msgObj, i) => {
      ticker === msgObj.removeTime || ticker > msgObj.removeTime
        ? this.speakArr.splice(i, 1)
        : this.drawSpeechBubble(msgObj.words, i);
    });
  }

  addMessage(message) {
    this.speakArr.unshift({
      words: message,
      removeTime: ticker + 160,
    });
  }


  update = () => {
    // this.x += getRanNum(-1, 1) * this.speed;
    // this.y += getRanNum(-1, 1) * this.speed;

    // this.x += 1* this.speed;
    // this.y += 1 * this.speed;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.vel.x > this.maxSpeed ? this.vel.x = this.maxSpeed : null;
    this.vel.x < this.maxSpeed *-1? this.vel.x = this.maxSpeed : null;

    this.vel.y > this.maxSpeed ? this.vel.y = this.maxSpeed : null;
    this.vel.y < this.maxSpeed *-1 ? this.vel.y = this.maxSpeed *-1 : null;


    console.log("this vel: ", this.vel)
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc = {x:0, y: 0};

    if (ticker % (this.resilience * 10) === 0) {
      this.changeEmotionLevel(getRanNum(-1, 1));
    }
    this.speak();
  };
}
