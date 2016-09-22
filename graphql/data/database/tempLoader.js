import {fetchVideoToJson} from './scrapper/fetchData';
import {pushJsonToMongo} from './scrapper/helper';
import mongoose from 'mongoose';
import {Video, User} from './models';

const mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/ForgeHub';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, async function (err) {
  err ? console.log('Mongo error: ', err) : console.log(`MongoDB connected to ${mongoUrl}`);
  fireScrapper(100, true).then(res => console.log(res));

  // Scratch Area to run random tests on backend
  // try {
  //   const {order, sortBy} = {order: 1, sortBy: 'views'};
  //   const populate = {path: 'game', match: {name: 'League of Legends'}};
  //
  //   let aa = (await Video.find('').populate(''))
  //     .filter(item => item[populate.path])
  //     .map(item => (item[populate.path] = item[populate.path].id, item))
  //     .sort((a, b) => (a[sortBy] - b[sortBy] || 0) * order);
  //   console.log(aa.length);
  // } catch (e) {console.log(e);}

  // let token = await User.login('Rx3', 'Rx3');
  // console.log(token);
});

// import forgeData from './recentFetchData.json';
export async function fireScrapper(count, jsonIntermediate) {
  let forgeData = await fetchVideoToJson(count, jsonIntermediate);
  return await pushJsonToMongo(forgeData);
}
