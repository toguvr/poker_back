"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../../../../modules/user/infra/http/routes/user.routes"));

var _room = _interopRequireDefault(require("../../../../modules/room/infra/http/routes/room.routes"));

var _usersRoom = _interopRequireDefault(require("../../../../modules/usersRoom/infra/http/routes/usersRoom.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/user', _user.default);
routes.use('/room', _room.default);
routes.use('/usersRoom', _usersRoom.default);
var _default = routes;
exports.default = _default;