import {fetchVideoToJson} from './scrapper/fetchData';
import {pushJsonToMongo} from './scrapper/helper';
import {Game, Video, User, Comment} from './models';

export async function fireScrapper(count, jsonIntermediate) {
  let forgeData = await fetchVideoToJson(count, jsonIntermediate);
  return await pushJsonToMongo(forgeData);
}
