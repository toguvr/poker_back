module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: '216.172.172.187',
    port: 3306,
    username: 'nahora08_beegin',
    password: 'Beegin100%',
    database: 'nahora08_poker',
    schema: '',
    synchronize: false,
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations',
    },
  },
];
