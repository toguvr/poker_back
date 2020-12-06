"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateRoomService = _interopRequireDefault(require("../../../services/CreateRoomService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RoomController {
  async index(request, response) {
    const user_id = request.user.id;

    const createRoom = _tsyringe.container.resolve(_CreateRoomService.default);

    const room = await createRoom.show();
    return response.json((0, _classTransformer.classToClass)(room));
  }

  async leave(request, response) {
    const user_id = request.user.id;

    const createRoom = _tsyringe.container.resolve(_CreateRoomService.default);

    const {
      room_id,
      boolean
    } = await createRoom.leave(user_id);
    const {
      io
    } = request;
    const {
      connectedUsers
    } = request;

    if ((boolean === 'admin' || boolean === true) && connectedUsers) {
      io.to(`room${room_id}`).emit('leftRoom', {
        boolean,
        sala: `room${room_id}`
      });
      io.to('home room').emit('leftHome', {
        boolean,
        sala: `home room`
      });
    }

    return response.json((0, _classTransformer.classToClass)(boolean));
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      topic
    } = request.body;

    const createRoom = _tsyringe.container.resolve(_CreateRoomService.default);

    const room = await createRoom.change({
      user_id,
      topic
    });
    const {
      io
    } = request;
    const {
      connectedUsers
    } = request;

    if (connectedUsers) {
      io.to(`room${room.id}`).emit(`newTopic${room.id}`, room);
    }

    return response.json((0, _classTransformer.classToClass)(room));
  }

  async create(request, response) {
    const user_id = request.user.id;
    const {
      isPrivate,
      password
    } = request.body;

    const createRoom = _tsyringe.container.resolve(_CreateRoomService.default);

    const room = await createRoom.execute({
      user_id,
      isPrivate,
      password
    });
    const {
      io
    } = request;
    const {
      connectedUsers
    } = request;

    if (connectedUsers) {
      io.to(`room${room.id}`).emit('createRoom', room);
      io.to('home room').emit('createRoomatHome', room);
    }

    return response.json((0, _classTransformer.classToClass)(room));
  }

}

exports.default = RoomController;