import mongoose, {Schema} from 'mongoose';

const commentSchema = Schema({
  message: String,
  author: { type: String, ref: 'User' },
  parentVid: { type: String, ref: 'Video' },
});

commentSchema.methods.fetch = function (prop) {
  return this.populate({path: prop}).execPopulate().then(value => value[prop]);
};

export default Comment = mongoose.model('Comment', commentSchema);
