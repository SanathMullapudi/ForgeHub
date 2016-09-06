
import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';

import GameType from './qlObjects/game';
import UserType from './qlObjects/user';
import VideoType from './qlObjects/video';

import {getGame, getUser, getVideo} from './database/forgeDatabase';

const getterFuncAndTypeDict = {
  Game: { getter: getGame, QLType: GameType },
  User: { getter: getUser, QLType: UserType },
  Video: { getter: getVideo, QLType: VideoType },
};

function getObjectAndAttachType({ type, id }) {
  let obj = getterFuncAndTypeDict[type].getter(Number(id));
  obj._type = getterFuncAndTypeDict[type].QLType;
  return obj;
}

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => getObjectAndAttachType(fromGlobalId(globalId)),
  (obj) => obj._type
);
