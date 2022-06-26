module.exports = [
  {
    type: 'sqlite',
    database: './dist/shared/infra/typeorm/database/database.sqlite',
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations',
    },
  },
];
