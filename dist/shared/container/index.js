"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _UserRepository = _interopRequireDefault(require("../../modules/user/infra/typeorm/repositories/UserRepository"));

var _RoomRepository = _interopRequireDefault(require("../../modules/room/infra/typeorm/repositories/RoomRepository"));

var _UsersRoomRepository = _interopRequireDefault(require("../../modules/usersRoom/infra/typeorm/repositories/UsersRoomRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UserRepository', _UserRepository.default);

_tsyringe.container.registerSingleton('RoomRepository', _RoomRepository.default);

_tsyringe.container.registerSingleton('UsersRoomRepository', _UsersRoomRepository.default);