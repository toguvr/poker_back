"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopicNull1600656628059 = void 0;

class TopicNull1600656628059 {
  constructor() {
    this.name = 'TopicNull1600656628059';
  }

  async up(queryRunner) {
    await queryRunner.query("ALTER TABLE `usersRoom` CHANGE `name` `name` int UNSIGNED NULL", undefined);
    await queryRunner.query("ALTER TABLE `room` CHANGE `topic` `topic` varchar(255) NULL", undefined);
  }

  async down(queryRunner) {
    await queryRunner.query("ALTER TABLE `room` CHANGE `topic` `topic` varchar(255) NOT NULL", undefined);
    await queryRunner.query("ALTER TABLE `usersRoom` CHANGE `name` `name` int UNSIGNED NOT NULL", undefined);
  }

}

exports.TopicNull1600656628059 = TopicNull1600656628059;