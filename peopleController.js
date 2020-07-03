// People Controller
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
    this.awarenessMap = {};
    this.longTermAwarenss = {};
    this.resilience = getRanNum(1, 15);
  }

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

      this.awarenessMap[personId].duration === 5
        ? this.speakArr.unshift({
            words: greetMessage,
            removeTime: ticker + 160,
          })
        : null;
    });
  }

  changeEmotionLevel = (diff) => {
    this.emotionLevel += diff;
    this.emotionLevel > 5 ? (this.emotionLevel = 5) : null;
    this.emotionLevel < -5 ? (this.emotionLevel = -5) : null;
  };

  getID = () => {
    return this.id;
  };

  addToAwareness = (newObj) => {
    let id = newObj.getID();
    if (!this.awarenessMap.hasOwnProperty(id)) {
      // check if Ive met them, are they in my memory

      this.awarenessMap[id] = {
        person: newObj,
        duration: 0,
      };
    } else {
      this.awarenessMap[id].duration++;
    }
  };

  removeFromAwareness = (personid) => {
    delete this.awarenessMap[personid];
  };

  drawSelf = () => {
    c.fillStyle = this.getEmotionColor(this.emotionLevel);
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360);
    c.strokeStyle = "#777";
    c.stroke();
    c.fill();
  };

  drawSelfStats = () => {
    c.font = "14px Arial";
    c.fillStyle = "darkgrey";
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

  getEmotionColor = (emotionLevel) => {
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

  update = () => {
    this.x += getRanNum(-1, 1) * this.speed;
    this.y += getRanNum(-1, 1) * this.speed;

    if (ticker % (this.resilience * 10) === 0) {
      this.changeEmotionLevel(getRanNum(-1, 1));
    }
    this.speak();
    // this.speakArr[0] ? this.drawSpeechBubble() : null;

    this.greet();
  };
}
