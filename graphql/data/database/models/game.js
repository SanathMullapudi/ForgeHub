import mongoose, {Schema} from 'mongoose';

const gameSchema = Schema({
  name: String,
  href: String,
  videos: [{type: String, ref: 'Video', default: []}],
});

gameSchema.methods.fetch = function (prop) {
  return this.populate({path: prop}).execPopulate().then(value => value[prop]);
};

gameSchema.statics.gamesByPopular = async () => {
  let games = await Game.find();
  return games.sort((a, b) => b.videos.length - a.videos.length);
};

gameSchema.methods.addVideos = function (newVideosIds) {
  const deDupedVids = newVideosIds.filter(id => !this.videos.includes(id));
  this.videos = this.videos.concat(deDupedVids);
  return this.save();
};

export default Game = mongoose.model('Game', gameSchema);
