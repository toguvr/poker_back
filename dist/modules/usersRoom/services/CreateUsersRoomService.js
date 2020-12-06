"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../user/repositories/IUserRepository"));

var _IRoomRepository = _interopRequireDefault(require("../../room/repositories/IRoomRepository"));

var _IUsersRoomRepository = _interopRequireDefault(require("../repositories/IUsersRoomRepository"));

var _IHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUsersRoomService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('RoomRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRoomRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _IRoomRepository.default === "undefined" ? Object : _IRoomRepository.default, typeof _IUsersRoomRepository.default === "undefined" ? Object : _IUsersRoomRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateUsersRoomService {
  constructor(userRepository, hashProvider, roomRepository, usersRoomRepository) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.roomRepository = roomRepository;
    this.usersRoomRepository = usersRoomRepository;
  }

  async show({
    room_id,
    user_id
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Dados do usuário não existe.');
    }

    const room = await this.roomRepository.findById(room_id);

    if (!room) {
      throw new _AppError.default('Sala não existe.');
    }

    return await this.usersRoomRepository.findAllInRoom(room_id);
  }

  async change({
    room_id,
    user_id,
    vote
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Dados do usuário não existe.');
    }

    const room = await this.roomRepository.findById(room_id);

    if (!room) {
      throw new _AppError.default('Sala não existe.');
    }

    const isAdmRoom = await this.roomRepository.findByAdmId(user_id);

    if (isAdmRoom && room_id === isAdmRoom.id) {
      throw new _AppError.default('Admin não vota.');
    }

    const userVote = await this.usersRoomRepository.findByUserIdandRoomId({
      user_id,
      room_id
    });

    if (!userVote) {
      throw new _AppError.default('Usuário não esta na sala para votar.');
    }

    userVote.vote = vote;
    return await this.usersRoomRepository.save(userVote);
  }

  async see({
    room_id,
    user_id,
    password
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Dados do usuário não existe.');
    }

    const room = await this.roomRepository.findById(room_id);

    if (!room) {
      throw new _AppError.default('Sala não existe.');
    }

    const userInRoomThisRoom = await this.usersRoomRepository.findByUserIdandRoomId({
      room_id,
      user_id
    });
    const isAdmRoom = await this.roomRepository.findByAdmId(user_id);

    if (userInRoomThisRoom) {
      throw new _AppError.default('Você já está na sala.');
    }

    if (room.isPrivate) {
      if (!password) {
        throw new _AppError.default('Sala privada, informe a senha.');
      }

      const passwordMatched = await this.hashProvider.compareHash(password, room?.password);

      if (room.isPrivate && !passwordMatched) {
        throw new _AppError.default('Senha incorreta.');
      }
    }

    const userInAnyRoom = await this.usersRoomRepository.findUserInAnyRoom(user_id);

    if (userInAnyRoom) {
      await this.usersRoomRepository.remove(userInAnyRoom);
    }

    if (isAdmRoom && room_id !== isAdmRoom.id) {
      await this.roomRepository.delete(isAdmRoom);
    }

    return true;
  }

  async execute({
    room_id,
    user_id,
    password
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Dados do usuário não existe.');
    }

    const room = await this.roomRepository.findById(room_id);

    if (!room) {
      throw new _AppError.default('Sala não existe.');
    }

    const userInRoomThisRoom = await this.usersRoomRepository.findByUserIdandRoomId({
      room_id,
      user_id
    });
    const isAdmRoom = await this.roomRepository.findByAdmId(user_id);

    if (userInRoomThisRoom) {
      throw new _AppError.default('Você já está na sala.');
    }

    if (room.isPrivate) {
      if (!password) {
        throw new _AppError.default('Sala privada, informe a senha.');
      }

      const passwordMatched = await this.hashProvider.compareHash(password, room?.password);

      if (room.isPrivate && !passwordMatched) {
        throw new _AppError.default('Senha incorreta.');
      }
    }

    const userInAnyRoom = await this.usersRoomRepository.findUserInAnyRoom(user_id);

    if (userInAnyRoom) {
      await this.usersRoomRepository.remove(userInAnyRoom);
    }

    if (isAdmRoom && room_id === isAdmRoom.id) {
      throw new _AppError.default('Você é o admin, não pode entrar para votar.');
    }

    if (isAdmRoom && room_id !== isAdmRoom.id) {
      await this.roomRepository.delete(isAdmRoom);
    }

    return await this.usersRoomRepository.create({
      user_id,
      room_id
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUsersRoomService;
exports.default = _default;