const timerFn = require('timer-node');
const timer = timerFn('test-timer');
const { Pool } = require('pg')
const custom = '%s secs %ms ms';


const pool = new Pool({
  host: 'localhost',
  user: 'hackreactor',
  database: 'fake_data',
  password: '',
  port: '5432'
})

pool.query('DROP TABLE IF EXISTS restaurants')
  .then(() => {
    pool.query('CREATE TABLE restaurants(id SERIAL, name varchar(75), location varchar(75), cuisine varchar(75))')
      .then(() => {
        console.clear();
        console.log('Seeding...');
        timer.start();
        pool.query(`COPY restaurants FROM '/Users/hackreactor/Desktop/HR/SDC/data-gen/data.csv' WITH DELIMITER ',' CSV HEADER`)
          .then(() => {
            timer.stop();
            console.clear();
            console.log(`Seeding completed in ${timer.format(custom)}.`)
          });
      })
      .catch(() => console.log('err'));
  })