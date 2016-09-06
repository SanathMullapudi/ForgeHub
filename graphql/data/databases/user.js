import DedupeSet from './dedupeSet';

let idCounter = 0;
class User {
  constructor({name, pic}) {
    this.name = name;
    this.pic = pic;
    this.vidSet = new DedupeSet();
    this.id = idCounter++;
  }

  get href() {
    return `http://forge.gg/${this.name}`;
  }

  get videos() {
    return [...this.vidSet];
  }

  addVideo(video) {
    this.vidSet.add(video);
  }

  equals(other) {
    return other.name === this.name;
  }
}

export default User;
