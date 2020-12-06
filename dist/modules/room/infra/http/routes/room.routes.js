"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _RoomController = _interopRequireDefault(require("../controllers/RoomController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roomRouter = (0, _express.Router)();
const roomController = new _RoomController.default();
roomRouter.use(_ensureAuthenticated.default);
roomRouter.get('/', roomController.index);
roomRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    topic: _celebrate.Joi.string().required()
  }
}), roomController.update);
roomRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    isPrivate: _celebrate.Joi.boolean(),
    password: _celebrate.Joi.optional()
  }
}), roomController.create);
roomRouter.get('/leave', roomController.leave);
var _default = roomRouter;
exports.default = _default;