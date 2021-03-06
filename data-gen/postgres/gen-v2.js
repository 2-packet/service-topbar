const fs = require('fs');
var casual = require('casual');
const timerFn = require('timer-node');
const timer = timerFn('test-timer');
const custom = '%s secs %ms ms';

function gen(writer, data, encoding, callback) {
  console.log('SEEDING...')
  timer.start();

  writer.write(`id,name,location,cuisine\n`, encoding);

  let i = 100000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      // let data = `${i}, ${faker.company.companyName()},${faker.address.city()},${faker.address.country()}\n`;
      let data = `${i},${casual.word},${casual.city},${casual.country}\n`;

      if (i === 0) {
        // last time!
        writer.write(data, encoding, callback);
        timer.stop();
        console.log(`Data generation completed in ${timer.format(custom)}.`)
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
        if (i === 5000000) console.log('HALF WAY THUR...')
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

gen(fs.createWriteStream('data-100mil.csv'), 'utf8', () => {});