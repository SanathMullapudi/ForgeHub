import DedupeSet from './dedupeSet';

let idCounter = 0;
class Video {
  constructor({title, pic, src, likes, href, author, game}) {
    this.title = title;
    this.pic = pic;
    this.src = src;
    this.likes = likes;
    this.href = href;
    this.author = author;
    this.game = game;
    this.viewBySet = new DedupeSet();
    this.id = idCounter++;
  }

  get viewers() { return [...this.viewBySet]; }

  addViewers(...args) {
    args.reduce((a, b) => a.concat(b), []).forEach(this.viewBySet.add, this.viewBySet);
  }

  equals(other) { return other.src === this.src; }
}

export default Video;
