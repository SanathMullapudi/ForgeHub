import {fetchVideoToJson} from './scrapper/fetchData';
import {pushJsonToMongo} from './scrapper/helper';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/ForgeHub';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, function (err) {
  err ? console.log('Mongo error: ', err) : console.log(`MongoDB connected to ${mongoUrl}`);
});

// import forgeData from './recentFetchData.json';
export async function fireScrapper(count, jsonIntermediate) {
  let forgeData = await fetchVideoToJson(count, jsonIntermediate);
  return await pushJsonToMongo(forgeData);
}

fireScrapper().then(res => console.log(res));
