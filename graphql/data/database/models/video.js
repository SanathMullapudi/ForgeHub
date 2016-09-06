import mongoose, {Schema} from 'mongoose';

const videoSchema = Schema({
  title: String,
  picture: String,
  src: String,
  href: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  viewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

videoSchema.methods.updateViewers = function (newViewers) {
  this.viewers = newViewers;
};

export default Video = mongoose.model('Video', videoSchema);
