import mongoose, {Schema} from 'mongoose';

const videoSchema = Schema({
  title: String,
  pic: String,
  src: String,
  href: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  viewedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default Video = mongoose.model('Video', videoSchema);
