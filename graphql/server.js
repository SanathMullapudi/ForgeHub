import express from 'express';
import mongoose from 'mongoose';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';
import {authMW} from './scripts/auth';

const GRAPHQL_PORT = process.env.PORT || 8080;
const mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/ForgeHub';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, function (err) {
  err ? console.log('Mongo error: ', err) : console.log(`MongoDB connected to ForgeHub`);
});

const graphQLApp = express();
graphQLApp.use('/', authMW, graphQLHTTP({schema, graphiql: true, pretty: true}));
const graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running`));

const io = require('socket.io')(graphQLServer, { serverClient: false });

io.on('connection', socket => {
  let chatRoom = '';
  //For the future should we want multiple subscriptions, room cound be [] and we would joinAll, could also be seperate namespace
  // socket.on('mutationRoom', room => socket.join(room));
  socket.on('room', ({roomId, userInfo}) => {
    chatRoom = roomId;
    socket.join(chatRoom);
    const room = io.sockets.adapter.rooms[chatRoom];
    room.users ? room.users.set(socket.id, userInfo) : room.users = new Map([[socket.id, userInfo]]);
    io.to(chatRoom).emit('liveViewerChange', [...room.users.values()]);
  });
  socket.on('disconnect', () => {
    const room = io.sockets.adapter.rooms[chatRoom];
    room && room.users && (room.users.delete(socket.id), io.to(chatRoom).emit('liveViewerChange', [...room.users.values()]));
  });
  socket.on('sendMessage', data => socket.broadcast.to(chatRoom).emit('chatMessage', data));
});

export function emitMessageToRoom(room, mutationData) {
  io.to(room).emit('mutation', mutationData);
}
