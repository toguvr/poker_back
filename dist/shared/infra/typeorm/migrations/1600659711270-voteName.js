"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voteName1600659711270 = void 0;

class voteName1600659711270 {
  constructor() {
    this.name = 'voteName1600659711270';
  }

  async up(queryRunner) {
    await queryRunner.query("ALTER TABLE `usersRoom` CHANGE `name` `vote` int UNSIGNED NULL", undefined);
  }

  async down(queryRunner) {
    await queryRunner.query("ALTER TABLE `usersRoom` CHANGE `vote` `name` int UNSIGNED NULL", undefined);
  }

}

exports.voteName1600659711270 = voteName1600659711270;