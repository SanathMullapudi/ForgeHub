import forgeData from './forgeData.json';
import DedupeSet from './dedupeSet';
import Video from './video';
import User from './user';
import Game from './game';

const games = new DedupeSet();
const users = new DedupeSet();
const videos = new DedupeSet();

function generateMetaData() {
  forgeData.forEach(post => {
    const {user: userData, game: gameData, video: videoData} = post;
    let game = parseToObject(Game, gameData, games);
    let user = parseToObject(User, userData, users);
    let video = parseToObject(Video, Object.defineProperties(videoData, {'game': {value: game}, 'author': {value: user} }), videos);
    game.addVideo(video);
    user.addVideo(video);
    video.addViewers(videoData.viewers.map(viewerData => parseToObject(User, viewerData, users)));
  });
}

function parseToObject(Type, data, list) {
  return list.find(new Type(data)) || list.add(new Type(data));
}

generateMetaData();

// Clean up redundancy later by using a map/object wrapper
export function getGames() { return [...games] }
export function getUsers() { return [...users] }
export function getVideos() { return [...videos] }

export function getGame(id) { return [...games].find((ele) => ele.id === id) }
export function getUser(id) { return [...users].find((ele) => ele.id === id) }
export function getVideo(id) { return [...videos].find((ele) => ele.id === id) }

// function writeDataToJSON() {
//   console.log('Write data to JSON');
//   process.exit();
// }
//
// process.stdin.resume();
// process.on('SIGINT', writeDataToJSON);
