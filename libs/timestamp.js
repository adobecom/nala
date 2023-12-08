const fs = require('fs');

fs.writeFileSync(
  'timestamp.json',
  JSON.stringify([(new Date()).toLocaleString()], null, 2),
);
