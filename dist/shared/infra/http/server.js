"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

require("express-async-errors");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _routes = _interopRequireDefault(require("./routes"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

require("../typeorm");

require("../../container");

var _tsyringe = require("tsyringe");

var _CreateRoomService = _interopRequireDefault(require("../../../modules/room/services/CreateRoomService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const server = _http.default.createServer(app);

const io = (0, _socket.default)(server);
const connectedUsers = {};
io.on('connection', socket => {
  const {
    user_id
  } = socket.handshake.query; // socket.join('home room');

  connectedUsers[user_id] = socket.id;
  socket.on('joinHome', () => {
    socket.join(`home room`);
  });
  socket.on('leaveHome', () => {
    socket.leave('home room');
  });
  socket.on('newRoom', room_id => {
    socket.join(`room${room_id}`);
  });
  socket.on('leaveRoom', room_id => {
    socket.leave(`room${room_id}`);
  });
  socket.on('disconnect', async () => {
    const createRoom = _tsyringe.container.resolve(_CreateRoomService.default);

    const {
      room_id,
      boolean
    } = await createRoom.leave(user_id);

    if ((boolean === 'admin' || boolean === true) && connectedUsers) {
      io.to(`room${room_id}`).emit('leftRoom', {
        boolean,
        sala: `room${room_id}`
      });
      io.to('home room').emit('leftHome', {
        boolean,
        sala: `server`
      });
    }

    delete connectedUsers[user_id];
  });
});
app.use((request, res, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;
  return next();
});
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
server.listen(3333, () => {
  console.log('🦾 Server started on port 3333');
});