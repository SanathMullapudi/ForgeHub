
import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';

import GameType from './qlObjects/game';
import UserType from './qlObjects/user';
import VideoType from './qlObjects/video';

import { Game, Video, User, Comment } from './database/models';

const modelsQlTypeDict = {
  Game: { model: Game, QLType: GameType },
  User: { model: User, QLType: UserType },
  Video: { model: Video, QLType: VideoType },
};

async function getObjectAndAttachType({ type, id }) {
  let obj = await (modelsQlTypeDict[type].model).findById(id);
  obj._type = modelsQlTypeDict[type].QLType;
  return obj;
}

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => getObjectAndAttachType(fromGlobalId(globalId)),
  (obj) => obj._type
);
