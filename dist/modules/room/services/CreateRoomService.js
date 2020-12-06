"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../user/repositories/IUserRepository"));

var _IUsersRoomRepository = _interopRequireDefault(require("../../usersRoom/repositories/IUsersRoomRepository"));

var _IRoomRepository = _interopRequireDefault(require("../repositories/IRoomRepository"));

var _IHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateRoomService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('RoomRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRoomRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IRoomRepository.default === "undefined" ? Object : _IRoomRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _IUsersRoomRepository.default === "undefined" ? Object : _IUsersRoomRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateRoomService {
  constructor(userRepository, roomRepository, hashProvider, usersRoomRepository) {
    this.userRepository = userRepository;
    this.roomRepository = roomRepository;
    this.hashProvider = hashProvider;
    this.usersRoomRepository = usersRoomRepository;
  }

  async show() {
    return await this.roomRepository.findAll();
  }

  async leave(user_id) {
    const roomIAmAdmId = await this.roomRepository.findByAdmId(user_id);
    const userInAnyRoom = await this.usersRoomRepository.findUserInAnyRoom(user_id);
    const roomIAmAdmId_id = roomIAmAdmId?.id;
    const userInAnyRoom_id = userInAnyRoom?.room_id;

    if (roomIAmAdmId) {
      await this.roomRepository.delete(roomIAmAdmId);
      return {
        boolean: 'admin',
        room_id: roomIAmAdmId_id
      };
    }

    if (userInAnyRoom) {
      await this.usersRoomRepository.remove(userInAnyRoom);
    }

    if (!roomIAmAdmId && !userInAnyRoom) {
      return {
        boolean: false
      };
    }

    return {
      boolean: true,
      room_id: userInAnyRoom_id
    };
  }

  async change({
    user_id,
    topic
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Dados do usuário não existe.');
    }

    const isAdm = await this.roomRepository.findByAdmId(user_id);

    if (!isAdm) {
      throw new _AppError.default('Apenas adm cria topicos.');
    }

    const room = await this.roomRepository.findById(isAdm.id);

    if (!room) {
      throw new _AppError.default('Sala não existe.');
    }

    room.topic = topic;
    await this.roomRepository.saveRoom(room);
    const allRooms = await this.usersRoomRepository.findAllInRoom(room.id);
    const rooms = allRooms.map(async currentRoom => {
      currentRoom.vote = null;
      await this.usersRoomRepository.save(currentRoom);
    });
    await Promise.all(rooms);
    return room;
  }

  async execute({
    user_id,
    isPrivate,
    password
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Dados do usuário não existe.');
    }

    const isAdm = await this.roomRepository.findByAdmId(user_id);

    if (isAdm) {
      await this.roomRepository.delete(isAdm);
    }

    const userInAnyRoom = await this.usersRoomRepository.findUserInAnyRoom(user_id);

    if (userInAnyRoom) {
      await this.usersRoomRepository.remove(userInAnyRoom);
    }

    let room;

    if (isPrivate) {
      const hashedPassword = await this.hashProvider.generateHash(password);
      return room = await this.roomRepository.create({
        adm_id: user_id,
        isPrivate,
        password: hashedPassword
      });
    }

    return room = await this.roomRepository.create({
      adm_id: user_id,
      isPrivate
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateRoomService;
exports.default = _default;