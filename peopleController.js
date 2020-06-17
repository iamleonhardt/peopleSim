// People Controller
class Person {
  constructor(name) {
    this.name = name;
    this.emotionLevel = getRanNum(-5, 5);
    this.radius = getRanNum(25, 35);
    this.x = getRanNum(0 + this.radius, 900);
    this.y = getRanNum(0 + this.radius, 800);
    this.color = getEmotionColor(this.emotionLevel);
    this.chatBubble = [];
    this.chatTimer = 0;
    this.awareArr = [];
  }
  greet(target) {
    speak("hello, ", target.name);
  }

  speak(message) {
    this.chatBubble.push(message);
    this.chatTimer = ticker + 160;
  }

  changeEmotionLevel = (diff) => {
    this.emotionLevel += diff;
    this.emotionLevel > 5 ? (this.emotionLevel = 5) : null;
    this.emotionLevel < -5 ? (this.emotionLevel = -5) : null;
  };
}
