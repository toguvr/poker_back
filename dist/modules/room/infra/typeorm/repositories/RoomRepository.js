"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Room = _interopRequireDefault(require("../entities/Room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RoomRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Room.default);
  }

  async findAll() {
    const findAppointment = await this.ormRepository.find({
      relations: ['admin', 'usersRoom']
    });
    return findAppointment;
  }

  async findById(id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return findAppointment;
  }

  async findByAdmId(id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        adm_id: id
      }
    });
    return findAppointment;
  }

  async delete(data) {
    await this.ormRepository.remove(data);
  }

  async saveRoom(data) {
    await this.ormRepository.save(data);
  }

  async create({
    adm_id,
    isPrivate,
    password
  }) {
    const room = this.ormRepository.create({
      adm_id,
      isPrivate,
      password
    });
    await this.ormRepository.save(room);
    return room;
  }

}

var _default = RoomRepository;
exports.default = _default;