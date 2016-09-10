import mongoose, {Schema} from 'mongoose';
import Comment from './comment';

const videoSchema = Schema({
  title: String,
  pic: String,
  src: String,
  href: String,
  author: { type: String, ref: 'User' },
  game: { type: String, ref: 'Game' },
  viewedBy: [{ type: String, ref: 'User' }], // a little misleading, since this people who only viewers and not likers
  likedBy: [{ type: String, ref: 'User' }], // this can be refacted, to have less misleading keys
  comments: [{ type: String, ref: 'Comment' }],
});

videoSchema.methods.fetch = function (prop) {
  return this.populate({path: prop}).execPopulate().then(value => value[prop]);
};

videoSchema.post('findOneAndUpdate', function (vid) {
  Comment.find({parentVid: vid.id}).then(comments => {
    comments.forEach(item => !vid.comments.includes(item.id) && item.remove());
  });
});

videoSchema.virtual('likes').get(function () {
  return this.likedBy.length;
});

videoSchema.virtual('views').get(function () {
  return this.likedBy.length + this.viewedBy.length;
});

export default Video = mongoose.model('Video', videoSchema);
