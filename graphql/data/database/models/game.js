import mongoose, {Schema} from 'mongoose';

const gameSchema = Schema({
  name: String,
  href: String,
  videos: [{type: Schema.Types.ObjectId, ref: 'Video', default: []}],
});

gameSchema.methods.addVideos = function (newVideos) {
  this.videos = this.videos.concat(newVideos);
  return this.save();
};

export default Game = mongoose.model('Game', gameSchema);
