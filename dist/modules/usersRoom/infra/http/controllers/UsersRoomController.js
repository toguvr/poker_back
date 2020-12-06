"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUsersRoomService = _interopRequireDefault(require("../../../services/CreateUsersRoomService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async index(request, response) {
    const user_id = request.user.id;
    const {
      room_id
    } = request.params;

    const createAppointment = _tsyringe.container.resolve(_CreateUsersRoomService.default);

    const usersRoom = await createAppointment.show({
      room_id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(usersRoom));
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      room_id,
      vote
    } = request.body;

    const createAppointment = _tsyringe.container.resolve(_CreateUsersRoomService.default);

    const usersRoom = await createAppointment.change({
      room_id,
      user_id,
      vote
    });
    const {
      io
    } = request;
    const {
      connectedUsers
    } = request;

    if (connectedUsers) {
      io.to(`room${room_id}`).emit(`newVote${room_id}`, usersRoom);
    }

    return response.json((0, _classTransformer.classToClass)(usersRoom));
  }

  async see(request, response) {
    const user_id = request.user.id;
    const {
      room_id,
      password
    } = request.body;

    const createAppointment = _tsyringe.container.resolve(_CreateUsersRoomService.default);

    const usersRoom = await createAppointment.see({
      room_id,
      user_id,
      password
    });
    return response.json((0, _classTransformer.classToClass)(usersRoom));
  }

  async create(request, response) {
    const user_id = request.user.id;
    const {
      room_id,
      password
    } = request.body;

    const createAppointment = _tsyringe.container.resolve(_CreateUsersRoomService.default);

    const usersRoom = await createAppointment.execute({
      room_id,
      user_id,
      password
    });
    const {
      io
    } = request;
    const {
      connectedUsers
    } = request;

    if (connectedUsers) {
      io.to(`room${room_id}`).emit('joinRoom', usersRoom);
      io.to('home room').emit('joinRoomAtHome', usersRoom);
    }

    return response.json((0, _classTransformer.classToClass)(usersRoom));
  }

}

exports.default = AppointmentsController;