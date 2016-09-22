import mongoose, {Schema} from 'mongoose';
import _ from 'lodash';

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
  timeAgo: String,
});

videoSchema.post('findOneAndUpdate', function (vid) {
  Comment.find({parentVid: vid.id}).then(comments => {
    comments.forEach(item => !vid.comments.includes(item.id) && item.remove());
  });
});

videoSchema.methods.fetch = function (prop) {
  return this.populate({path: prop}).execPopulate().then(value => value[prop]);
};

// This is super hacky, not perf optimized, and potentially not safe, esp. if ur mongodb is unsecured
// The upside, client requests exact data it wants, thus minimizing REST endpoints, very graphql-esque
// 'overcomes' mongodb lack of joins, and avoid persisting virtuals ('views', 'likes') to object/json
// That being that, if this wasn't for a prototype, I would lean away from this solution/hack, or carefully think over edge cases
videoSchema.statics.getVids = async function ({shuffle=false, query='', populate='', mSort=''}) {
  const queryData = query && JSON.parse(query);
  const popData = populate && JSON.parse(populate);
  const sortData = mSort && JSON.parse(mSort);
  const vids = (await Video.find(queryData).populate(popData))
    .filter(item => !populate || item[popData.path])
    .map(item => (!populate || (item[popData.path] = item[popData.path].id), item))
    .sort((a, b) => (a[sortData.by] - b[sortData.by] || 0) * sortData.order);
  return shuffle ? _.shuffle(vids) : vids;
};

videoSchema.virtual('likes').get(function () {
  return this.likedBy.length;
});

videoSchema.virtual('views').get(function () {
  return this.likedBy.length + this.viewedBy.length;
});

export default Video = mongoose.model('Video', videoSchema);
