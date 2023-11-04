import figlet = require('figlet');

figlet(process.argv[2], function (err, data) {
  if (err) {
    console.error('Something went wrong...');
    console.dir(err);
    return;
  }
  console.info(data);
});
