// People Controller
class Person {
  constructor(name) {
    this.name = name;
    this.emotionLevel = getRanNum(-5, 5);
    this.radius = getRanNum(6, 8);
    this.x = getRanNum(0 + this.radius, 900);
    this.y = getRanNum(0 + this.radius, 800);
    this.color = getEmotionColor(this.emotionLevel);
  }

  speak() {
    console.log(this.name + " says " + getRanNum(1, 5));
  }

  changeEmotionLevel = (diff) => {
    this.emotionLevel += diff;
    this.emotionLevel > 5 ? (this.emotionLevel = 5) : null;
    this.emotionLevel < -5 ? (this.emotionLevel = -5) : null;
  };
}
