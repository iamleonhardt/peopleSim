class Person {
  constructor(name, i) {
    this.socialDistance = 150;
    this.name = name;
    this.id = name + "_" + i;
    this.emotionLevel = getRanNum(-5, 5);
    this.radius = getRanNum(5, 10);
    this.x = getRanNum(0 + this.radius, canvas.width);
    this.y = getRanNum(0 + this.radius, canvas.height);
    this.speed = getRanNum(1, 5);
    this.color = this.getEmotionColor(this.emotionLevel);
    this.speakArr = []; // {words: "string", removeTime: num}
    this.chatTimer = 0;
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
    // If not in awarenessMap, add them
    if (!this.awarenessMap.hasOwnProperty(id)) {
      this.addToAwarenessMap(personObj);
      // If not in longTermAwareness, add them
      if (!this.longTermAwarenessMap.hasOwnProperty(id)) {
        this.addToLongTermAwarenessMap(personObj);
      } else {
        // If in longTermAwareness, set lastAwareTime to 0
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
    c.fillStyle = this.getEmotionColor(this.emotionLevel);
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360);
    c.strokeStyle = "#999";
    c.stroke();
    c.fill();
  };

  drawSelfStats = () => {
    c.beginPath();
    c.font = "14px Arial";
    c.fillStyle = "#999";
    c.fillText(this.name, this.x + this.radius + 8, this.y);
    c.fillText(
      "e: " + this.emotionLevel,
      this.x + this.radius + 8,
      this.y + 14
    );
  };

  drawSpeechBubble = (text, i) => {
    let textWidth = c.measureText(text).width;
    c.fillStyle = "white";
    c.beginPath();
    c.fillRect(
      this.x - 24 - textWidth,
      this.y - 12 + i * 24,
      textWidth + 8,
      22
    );
    c.stroke();
    c.fill();

    c.font = "14px Arial";
    c.fillStyle = "darkgrey";
    c.fillText(text, this.x - 20 - textWidth, this.y + 4 + i * 24);
  };

  speak() {
    this.speakArr.map((msgObj, i) => {
      ticker === msgObj.removeTime
        ? this.speakArr.splice(i, 1)
        : this.drawSpeechBubble(msgObj.words, i);
    });
  }

  greet() {
    Object.keys(this.awarenessMap).forEach((personId) => {
      let greetMessage = "Hello, " + this.awarenessMap[personId].person.name;

      // Just became aware
      if (this.awarenessMap[personId].durationOfAwareness === 5) {
        if (this.longTermAwarenessMap[personId].lastAwareTimestamp < 25) {
          this.speakArr.unshift({
            words: greetMessage,
            removeTime: ticker + 160,
          });
        }
      }
    });
  }

  update = () => {
    this.x += getRanNum(-1, 1) * this.speed;
    this.y += getRanNum(-1, 1) * this.speed;

    if (ticker % (this.resilience * 10) === 0) {
      this.changeEmotionLevel(getRanNum(-1, 1));
    }
    this.speak();
    this.greet();
  };
}
