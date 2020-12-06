"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _UserCotroller = _interopRequireDefault(require("../controllers/UserCotroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = (0, _express.Router)();
const userCotroller = new _UserCotroller.default();
userRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required()
  }
}), userCotroller.create);
userRouter.get('/teste', userCotroller.teste);
var _default = userRouter;
exports.default = _default;