"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTable1656259684837 = void 0;

class CreateTable1656259684837 {
  constructor() {
    this.name = 'CreateTable1656259684837';
  }

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`, undefined);
    await queryRunner.query(`CREATE TABLE "usersRoom" ("id" varchar PRIMARY KEY NOT NULL, "vote" integer, "user_id" varchar(255) NOT NULL, "room_id" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`, undefined);
    await queryRunner.query(`CREATE INDEX "roomuser_room_id_fk" ON "usersRoom" ("room_id") `, undefined);
    await queryRunner.query(`CREATE INDEX "roomuser_user_id_fk" ON "usersRoom" ("user_id") `, undefined);
    await queryRunner.query(`CREATE TABLE "room" ("id" varchar PRIMARY KEY NOT NULL, "topic" varchar(255), "adm_id" varchar(255) NOT NULL, "isPrivate" tinyint NOT NULL DEFAULT ('0'), "password" varchar(255), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`, undefined);
    await queryRunner.query(`CREATE INDEX "users_room_user_id_fk" ON "room" ("adm_id") `, undefined);
    await queryRunner.query(`DROP INDEX "roomuser_room_id_fk"`, undefined);
    await queryRunner.query(`DROP INDEX "roomuser_user_id_fk"`, undefined);
    await queryRunner.query(`CREATE TABLE "temporary_usersRoom" ("id" varchar PRIMARY KEY NOT NULL, "vote" integer, "user_id" varchar(255) NOT NULL, "room_id" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_16c8d947f96115a0d9e4cf9b0d0" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_1724600701bb30d3dda542936bb" FOREIGN KEY ("room_id") REFERENCES "room" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`, undefined);
    await queryRunner.query(`INSERT INTO "temporary_usersRoom"("id", "vote", "user_id", "room_id", "created_at", "updated_at") SELECT "id", "vote", "user_id", "room_id", "created_at", "updated_at" FROM "usersRoom"`, undefined);
    await queryRunner.query(`DROP TABLE "usersRoom"`, undefined);
    await queryRunner.query(`ALTER TABLE "temporary_usersRoom" RENAME TO "usersRoom"`, undefined);
    await queryRunner.query(`CREATE INDEX "roomuser_room_id_fk" ON "usersRoom" ("room_id") `, undefined);
    await queryRunner.query(`CREATE INDEX "roomuser_user_id_fk" ON "usersRoom" ("user_id") `, undefined);
    await queryRunner.query(`DROP INDEX "users_room_user_id_fk"`, undefined);
    await queryRunner.query(`CREATE TABLE "temporary_room" ("id" varchar PRIMARY KEY NOT NULL, "topic" varchar(255), "adm_id" varchar(255) NOT NULL, "isPrivate" tinyint NOT NULL DEFAULT ('0'), "password" varchar(255), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_84350ac6d1c0fd7c3a377760d2d" FOREIGN KEY ("adm_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`, undefined);
    await queryRunner.query(`INSERT INTO "temporary_room"("id", "topic", "adm_id", "isPrivate", "password", "created_at", "updated_at") SELECT "id", "topic", "adm_id", "isPrivate", "password", "created_at", "updated_at" FROM "room"`, undefined);
    await queryRunner.query(`DROP TABLE "room"`, undefined);
    await queryRunner.query(`ALTER TABLE "temporary_room" RENAME TO "room"`, undefined);
    await queryRunner.query(`CREATE INDEX "users_room_user_id_fk" ON "room" ("adm_id") `, undefined);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP INDEX "users_room_user_id_fk"`, undefined);
    await queryRunner.query(`ALTER TABLE "room" RENAME TO "temporary_room"`, undefined);
    await queryRunner.query(`CREATE TABLE "room" ("id" varchar PRIMARY KEY NOT NULL, "topic" varchar(255), "adm_id" varchar(255) NOT NULL, "isPrivate" tinyint NOT NULL DEFAULT ('0'), "password" varchar(255), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`, undefined);
    await queryRunner.query(`INSERT INTO "room"("id", "topic", "adm_id", "isPrivate", "password", "created_at", "updated_at") SELECT "id", "topic", "adm_id", "isPrivate", "password", "created_at", "updated_at" FROM "temporary_room"`, undefined);
    await queryRunner.query(`DROP TABLE "temporary_room"`, undefined);
    await queryRunner.query(`CREATE INDEX "users_room_user_id_fk" ON "room" ("adm_id") `, undefined);
    await queryRunner.query(`DROP INDEX "roomuser_user_id_fk"`, undefined);
    await queryRunner.query(`DROP INDEX "roomuser_room_id_fk"`, undefined);
    await queryRunner.query(`ALTER TABLE "usersRoom" RENAME TO "temporary_usersRoom"`, undefined);
    await queryRunner.query(`CREATE TABLE "usersRoom" ("id" varchar PRIMARY KEY NOT NULL, "vote" integer, "user_id" varchar(255) NOT NULL, "room_id" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`, undefined);
    await queryRunner.query(`INSERT INTO "usersRoom"("id", "vote", "user_id", "room_id", "created_at", "updated_at") SELECT "id", "vote", "user_id", "room_id", "created_at", "updated_at" FROM "temporary_usersRoom"`, undefined);
    await queryRunner.query(`DROP TABLE "temporary_usersRoom"`, undefined);
    await queryRunner.query(`CREATE INDEX "roomuser_user_id_fk" ON "usersRoom" ("user_id") `, undefined);
    await queryRunner.query(`CREATE INDEX "roomuser_room_id_fk" ON "usersRoom" ("room_id") `, undefined);
    await queryRunner.query(`DROP INDEX "users_room_user_id_fk"`, undefined);
    await queryRunner.query(`DROP TABLE "room"`, undefined);
    await queryRunner.query(`DROP INDEX "roomuser_user_id_fk"`, undefined);
    await queryRunner.query(`DROP INDEX "roomuser_room_id_fk"`, undefined);
    await queryRunner.query(`DROP TABLE "usersRoom"`, undefined);
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }

}

exports.CreateTable1656259684837 = CreateTable1656259684837;