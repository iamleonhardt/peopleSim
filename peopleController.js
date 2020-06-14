// People Controller
class Person {
  constructor(props) {
    Object.assign(this, props);
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
