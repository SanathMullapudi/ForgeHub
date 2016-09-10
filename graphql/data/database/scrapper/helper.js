import mongoose from 'mongoose';
import {Game, Video, User, Comment} from '../models';

// This function is intentionally execute sequantially to avoid duplicate mongo objects, hence no await*/Promise.all
export async function pushJsonToMongo(jsonArr) {
  try {
    for (const {user, game, video} of jsonArr) {
      let mUser = await User.findOneAndUpdate({href: user.href}, user, {new: true, upsert: true});
      let mGame = await Game.findOneAndUpdate({href: game.href}, game, {new: true, upsert: true});
      let mVideo = await Video.findOneAndUpdate({to: video.to}, {to: video.to}, {new: true, upsert: true});
      video.author = mUser.id;
      video.game = mGame.id;
      video.likedBy = await mongoViewerRefs(video.viewers.filter(item => item.likedVidBool));
      video.viewedBy = await mongoViewerRefs(video.viewers.filter(item => !item.likedVidBool));
      video.comments = await mongoCommentRefs(video.comments, mVideo.id);
      mVideo = await Video.findOneAndUpdate({to: video.to}, video, {new: true, upsert: true});
      mUser = await mUser.addVideos([mVideo.id]);
      mGame = await mGame.addVideos([mVideo.id]);
    };
    return 'success';
  } catch (err) {throw err;}
}

// This is executed concurrently, on the assumption that Forge website doesnt show duplicates in the viewers section
function mongoViewerRefs(viewers) {
  return Promise.all(viewers.map(viewer =>
    User.findOneAndUpdate({href: viewer.href}, viewer, {new: true, upsert: true})
      .then(user => user.id)
  ));
}

// This is executed sequantially, since same post can have 2 comments for same author, might make duplicate authors, hence no await*/Promise.all
async function mongoCommentRefs(comments, parentVid) {
  const commentsMongoId = [];
  for (const {href, message, pic} of comments) {
    const mUser = await User.findOneAndUpdate({href}, {href, pic}, {new: true, upsert: true});
    const mComment = await Comment.create({message, author: mUser.id, parentVid});
    commentsMongoId.push(mComment.id);
  }
  return commentsMongoId;
}

export function setNestedObjValue(obj, path, val) {
  let pathArr = path.split('.');
  let key = pathArr.shift();
  pathArr.length ? (
    obj[key] ? null : obj[key] = {},
    setNestedObjValue(obj[key], pathArr.join('.'), val)
  ) : obj[key] = val;
};
