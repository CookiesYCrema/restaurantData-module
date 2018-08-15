/* const faker = require('faker');
const fs = require('fs');

fs.writeFile('restaurantData.csv', 'name, menu, is_closed, url, price, health_score', (err) => {  
  if (err) throw err;
  console.log('Header created!');
  let recurseSeeding = (count = 0) => {
    if(count % 100000 === 0) console.log('creating:', count + 1)
    if(count  === 1000000) return; // set to a million.
      let name = faker.lorem.words(3);
      let menu = faker.internet.url();
      let is_closed = faker.random.boolean();
      let url = faker.internet.url();
      let price = faker.random.number({min:1, max:4});
      let health_score = faker.random.number({min:1, max:100});
      let entry = '\n' + name + ', ' + menu + ', ' + is_closed + ', ' + url + ', ' + price + ', ' + health_score;
      fs.appendFile('restaurantData.csv', entry, (err) => {
        if (err) throw err;
        recurseSeeding(count + 1)
      });
  };
  recurseSeeding();
}); */

/* to import from the created csv file into postgres -  from Mario - 
> \copy places(name, reviews, rating, price, "mainCategory", "subCategories", city, image) FROM 'C:/Users/mario/Documents/HR/HRLA23/SystemDesignCapstone/also-viewed-restaurants/data.csv' CSV HEADER;


\copy restaurantdata(name, menu, is_closed, url, price, health_score) FROM '/Users/neilmartin/Documents/Coding/hrla23/SDC/restaurantData-module/data1.csv' CSV HEADER; */
// benchmark in psql with \timing --> timing = 'on'
// sample query select * from restaurantdata where is_closed = "false";

const faker = require('faker');
const fs = require('fs');
const write = fs.createWriteStream('./data1.csv');

function seedData(writer, encoding, callback) {
  let i = 0;
  let max = 10000000;
  function write() {
    let ok = true;
    while (i < max && ok) {
      let name = faker.lorem.words(3);
      let menu = faker.internet.url();
      let is_closed = faker.random.boolean();
      let url = faker.internet.url();
      let price = faker.random.number({min:1, max:4});
      let health_score = faker.random.number({min:1, max:100});
      const model = [name, menu, is_closed, url, price, health_score];
      i += 1;
      if (i % 100000 === 0) { console.log(i); }
      if (i === max) {
        writer.write(`${model.join(',')}`, encoding, callback);
      } else {
        if(i === 1) {
          console.log('writting header')
          const header = ['name', 'menu', 'is_closed', 'url', 'price', 'health_score'];
          ok = writer.write(`${header.join(',')}\n`, encoding);
        }
        ok = writer.write(`${model.join(',')}\n`, encoding);
      }
    }
    if (i < max) {
      writer.once('drain', write);
    }
  }
  write();
};
seedData(write, 'utf8', () => { console.log('done'); });