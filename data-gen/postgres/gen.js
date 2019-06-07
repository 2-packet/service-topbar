const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
var faker = require('faker');

const gen = () => {
  writer.pipe(fs.createWriteStream('data-100mil.csv'));

  for(let i = 0; i < 100000000; i++){
    writer.write({
      id: i,
      restaurant: faker.company.companyName(),
      location: faker.address.city(),
      cuisine: faker.address.country(),
    })
    console.log('GEN: ', i);
  }

  writer.end();
  console.log('DONE');
}

gen();