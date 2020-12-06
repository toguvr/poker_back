"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Room = _interopRequireDefault(require("../../../../room/infra/typeorm/entities/Room"));

var _User = _interopRequireDefault(require("../../../../user/infra/typeorm/entities/User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let UsersRoom = (_dec = (0, _typeorm.Index)('roomuser_user_id_fk', ['user_id'], {}), _dec2 = (0, _typeorm.Index)('roomuser_room_id_fk', ['room_id'], {}), _dec3 = (0, _typeorm.Entity)('usersRoom', {
  schema: 'beeginscrum'
}), _dec4 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)('int', {
  name: 'vote',
  unsigned: true,
  nullable: true
}), _dec7 = Reflect.metadata("design:type", Number), _dec8 = (0, _typeorm.Column)('varchar', {
  name: 'user_id',
  length: 255
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)('varchar', {
  name: 'room_id',
  length: 255
}), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.CreateDateColumn)(), _dec13 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec14 = (0, _typeorm.UpdateDateColumn)(), _dec15 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec16 = (0, _typeorm.ManyToOne)(() => _User.default, usersRoom => usersRoom.usersRoom, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}), _dec17 = (0, _typeorm.JoinColumn)([{
  name: 'user_id',
  referencedColumnName: 'id'
}]), _dec18 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec19 = (0, _typeorm.ManyToOne)(() => _Room.default, usersRoom => usersRoom.usersRoom, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}), _dec20 = (0, _typeorm.JoinColumn)([{
  name: 'room_id',
  referencedColumnName: 'id'
}]), _dec21 = Reflect.metadata("design:type", typeof _Room.default === "undefined" ? Object : _Room.default), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = class UsersRoom {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "vote", _descriptor2, this);

    _initializerDefineProperty(this, "user_id", _descriptor3, this);

    _initializerDefineProperty(this, "room_id", _descriptor4, this);

    _initializerDefineProperty(this, "created_at", _descriptor5, this);

    _initializerDefineProperty(this, "updated_at", _descriptor6, this);

    _initializerDefineProperty(this, "user", _descriptor7, this);

    _initializerDefineProperty(this, "room", _descriptor8, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vote", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "room_id", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec16, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "room", [_dec19, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
exports.default = UsersRoom;