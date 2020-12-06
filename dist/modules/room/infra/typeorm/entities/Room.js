"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UsersRoom = _interopRequireDefault(require("../../../../usersRoom/infra/typeorm/entities/UsersRoom"));

var _User = _interopRequireDefault(require("../../../../user/infra/typeorm/entities/User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Room = (_dec = (0, _typeorm.Index)('users_room_user_id_fk', ['adm_id'], {}), _dec2 = (0, _typeorm.Entity)('room', {
  schema: 'beeginscrum'
}), _dec3 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec4 = Reflect.metadata("design:type", String), _dec5 = (0, _typeorm.Column)('varchar', {
  name: 'topic',
  length: 255,
  nullable: true
}), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _typeorm.Column)('varchar', {
  name: 'adm_id',
  length: 255
}), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.Column)('tinyint', {
  name: 'isPrivate',
  unsigned: true,
  default: () => "'0'"
}), _dec10 = Reflect.metadata("design:type", Number), _dec11 = (0, _typeorm.Column)('varchar', {
  name: 'password',
  length: 255,
  nullable: true
}), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.CreateDateColumn)(), _dec14 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec15 = (0, _typeorm.UpdateDateColumn)(), _dec16 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec17 = (0, _typeorm.ManyToOne)(() => _User.default, user => user.admin, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}), _dec18 = (0, _typeorm.JoinColumn)([{
  name: 'adm_id',
  referencedColumnName: 'id'
}]), _dec19 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec20 = (0, _typeorm.OneToMany)(() => _UsersRoom.default, usersRoom => usersRoom.room), _dec21 = Reflect.metadata("design:type", Array), _dec(_class = _dec2(_class = (_class2 = (_temp = class Room {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "topic", _descriptor2, this);

    _initializerDefineProperty(this, "adm_id", _descriptor3, this);

    _initializerDefineProperty(this, "isPrivate", _descriptor4, this);

    _initializerDefineProperty(this, "password", _descriptor5, this);

    _initializerDefineProperty(this, "created_at", _descriptor6, this);

    _initializerDefineProperty(this, "updated_at", _descriptor7, this);

    _initializerDefineProperty(this, "admin", _descriptor8, this);

    _initializerDefineProperty(this, "usersRoom", _descriptor9, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "topic", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "adm_id", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isPrivate", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "password", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "admin", [_dec17, _dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "usersRoom", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
exports.default = Room;