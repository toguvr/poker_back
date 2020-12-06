"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UsersRoom = _interopRequireDefault(require("../entities/UsersRoom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRoomRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UsersRoom.default);
  }

  async findById(id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return findAppointment;
  }

  async findByUserIdandRoomId({
    user_id,
    room_id
  }) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        user_id,
        room_id
      }
    });
    return findAppointment;
  }

  async findUserInAnyRoom(user_id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        user_id
      }
    });
    return findAppointment;
  }

  async findAllInRoom(room_id) {
    const findAppointment = await this.ormRepository.find({
      where: {
        room_id
      },
      relations: ['user', 'room']
    });
    return findAppointment;
  }

  async remove(data) {
    await this.ormRepository.remove(data);
  }

  async save(data) {
    return await this.ormRepository.save(data);
  }

  async create({
    user_id,
    room_id
  }) {
    const usersRoom = this.ormRepository.create({
      user_id,
      room_id
    });
    await this.ormRepository.save(usersRoom);
    return usersRoom;
  }

}

var _default = UsersRoomRepository;
exports.default = _default;