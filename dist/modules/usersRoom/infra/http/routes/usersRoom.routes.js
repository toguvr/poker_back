"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _celebrate = require("celebrate");

var _UsersRoomController = _interopRequireDefault(require("../controllers/UsersRoomController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roomUsersRouter = (0, _express.Router)();
const usersRoomController = new _UsersRoomController.default();
roomUsersRouter.use(_ensureAuthenticated.default);
roomUsersRouter.get('/:room_id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    room_id: _celebrate.Joi.string().uuid().required()
  }
}), usersRoomController.index);
roomUsersRouter.post('/room', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    room_id: _celebrate.Joi.string().uuid().required(),
    password: _celebrate.Joi.optional()
  }
}), usersRoomController.create);
roomUsersRouter.post('/seeRoom', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    room_id: _celebrate.Joi.string().uuid().required(),
    password: _celebrate.Joi.optional()
  }
}), usersRoomController.see);
roomUsersRouter.put('/vote', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    room_id: _celebrate.Joi.string().uuid().required(),
    vote: _celebrate.Joi.number().required()
  }
}), usersRoomController.update);
var _default = roomUsersRouter;
exports.default = _default;