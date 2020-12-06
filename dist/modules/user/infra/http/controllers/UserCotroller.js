"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserCotroller {
  async teste(request, response) {
    return response.json(process.env.MYSQLCONNSTR_localdb);
  }

  async create(request, response) {
    const {
      name
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const {
      user,
      token
    } = await createUser.execute({
      name
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = UserCotroller;