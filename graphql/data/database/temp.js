import mongoose from 'mongoose';

import {fetchVideoToJson} from './scrapper/fetchData';
import {pushJsonToMongo} from './scrapper/helper';
import {Game, Video, User, Comment} from './models';

// const test = new User({ name: 'Sanath' });
// test.save(err => console.log(err ? err : 'success'));
//
// User.findOne({ name: 'Sanath' }, (err, person) => {
//   console.log(person.href());
// });

// var data = fetchVideoToJson();
// data.then(tt => console.log('here', tt));

import jsonArr from './recentFetchData.json';
pushJsonToMongo(jsonArr).then(val => console.log(val), err => console.log(err));

// Comment.findOne().then(val => console.log(val))
