"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findByDate(date, provider_id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
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

  async remove(data) {
    await this.ormRepository.remove(data);
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName},'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async searchAllAppointmentsFromUserBetweenDate({
    createAt,
    expirationAt,
    user_id,
    enterprise_id
  }) {
    const appointments = this.ormRepository.find({
      where: {
        user_id,
        enterprise_id,
        date: (0, _typeorm.Between)(createAt, expirationAt)
      }
    });
    return appointments;
  }

  async findAllFromUser(user_id) {
    const appointments = this.ormRepository.find({
      where: {
        user_id
      },
      relations: ['user', 'service']
    });
    return appointments;
  }

  async findAllFromUserInFutureDate(user_id) {
    const appointments = this.ormRepository.find({
      where: {
        user_id,
        date: (0, _typeorm.MoreThanOrEqual)(new Date())
      },
      relations: ['user', 'service', 'enterprise', 'service.appointments', 'service.appointments.user'],
      order: {
        date: 'ASC'
      }
    });
    return appointments;
  }

  async findAllFromUserInPastDate(user_id) {
    const appointments = this.ormRepository.find({
      where: {
        user_id,
        date: (0, _typeorm.LessThan)(new Date())
      },
      relations: ['user', 'service', 'enterprise', 'service.appointments', 'service.appointments.user'],
      order: {
        date: 'ASC'
      }
    });
    return appointments;
  }

  async findAllFromUserInThisEnterprise(user_id, enterprise_id) {
    const appointments = this.ormRepository.find({
      where: {
        user_id,
        enterprise_id
      },
      relations: ['user', 'service']
    });
    return appointments;
  }

  async findByServiceAndUserId(user_id, service_id) {
    const appointments = this.ormRepository.findOne({
      where: {
        user_id,
        service_id,
        date: (0, _typeorm.MoreThanOrEqual)(new Date())
      },
      relations: ['user', 'service']
    });
    return appointments;
  }

  async usersInService(service_id, service_date) {
    const numberOfAppointment = await this.ormRepository.find({
      relations: ['user', 'service'],
      where: {
        service_id,
        date: (0, _typeorm.Raw)(dateFieldName => `DATE(${dateFieldName}) = DATE('${new Date(service_date).toISOString()}')`)
      }
    }); // .query(`
    // SELECT * from appointments where service_id = '${service_id}' and DATE(date) = DATE('${new Date(
    //   service_date,
    // ).toISOString()}')
    // `);

    return numberOfAppointment;
  }

  async create({
    name
  }) {
    const user = this.ormRepository.create({
      name
    });
    await this.ormRepository.save(user);
    return user;
  }

}

var _default = UserRepository;
exports.default = _default;