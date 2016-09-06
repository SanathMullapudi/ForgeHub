import mongoose, {Schema} from 'mongoose';

const commentSchema = Schema({
  message: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  parentVid: { type: Schema.Types.ObjectId, ref: 'Video' },
  position: Number,
});

export default Comment = mongoose.model('Comment', commentSchema);
