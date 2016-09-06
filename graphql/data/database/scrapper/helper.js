import mongoose from 'mongoose';
import {Game, Video, User, Comment} from '../models';

// This function is intentionally execute sequantially to avoid duplicate mongo objects, hence no await*/Promise.all
export async function pushJsonToMongo(jsonArr) {
  try {
    for (const {user, game, video} of jsonArr) {
      let mUser = await User.findOneAndUpdate({href: user.href}, user, {new: true, upsert: true});
      let mGame = await Game.findOneAndUpdate({href: game.href}, game, {new: true, upsert: true});
      let mVideo = await Video.findOneAndUpdate({to: video.to}, {to: video.to}, {new: true, upsert: true});
      video.author = mUser._id;
      video.game = mGame._id;
      video.likedBy = await mongoViewerRefs(video.viewers.filter(item => item.likedVidBool));
      video.viewedBy = await mongoViewerRefs(video.viewers.filter(item => !item.likedVidBool));
      video.comments = await mongoCommentRefs(video.comments, mVideo._id);
      mVideo = await Video.findOneAndUpdate({to: video.to}, video, {new: true, upsert: true});
      mUser = await mUser.addVideos([mVideo._id]);
      mGame = await mGame.addVideos([mVideo._id]);
    };
    return 'success';
  } catch (err) {throw err;}
}

// This is executed concurrently on the assumption that, Forge website doesnt show duplicates in their viewers' section
function mongoViewerRefs(viewers) {
  return Promise.all(viewers.map(viewer =>
    User.findOneAndUpdate({href: viewer.href}, viewer, {new: true, upsert: true})
      .then(user => user._id)
  ));
}

// This is executed concurrently on the assumption that, we don't have duplicate comments, which in generally as bad idea
// however the videos I have sampled tend to have barely any comments so this should be okay
function mongoCommentRefs(comments, parentVid) {
  return Promise.all(comments.map((comment, position) =>
    User.findOneAndUpdate({href: comment.href}, comment, {new: true, upsert: true})
    .then(mUser => {
      let commentData = {message: comment.message, author: mUser._id, parentVid, position};
      let uniqueIden = {parentVid, position};
      return Comment.findOneAndUpdate(uniqueIden, commentData, {new: true, upsert: true})
      .then(comment => comment._id);
    })
  ));
}

export function setNestedObjValue(obj, path, val) {
  let pathArr = path.split('.');
  let key = pathArr.shift();
  pathArr.length ? (
    obj[key] ? null : obj[key] = {},
    setNestedObjValue(obj[key], pathArr.join('.'), val)
  ) : obj[key] = val;
};
