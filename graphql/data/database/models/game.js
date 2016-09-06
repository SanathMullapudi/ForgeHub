import mongoose, {Schema} from 'mongoose';

const gameSchema = Schema({
  name: String,
  picture: String,
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});

// To be implement via a dictionary since games dont really follow a pattern
gameSchema.methods.href = function () {
  return null;
};

gameSchema.methods.addVideos = function (newVideos) {
  this.videos.concat(newVideos);
};

export default Game = mongoose.model('Game', gameSchema);
