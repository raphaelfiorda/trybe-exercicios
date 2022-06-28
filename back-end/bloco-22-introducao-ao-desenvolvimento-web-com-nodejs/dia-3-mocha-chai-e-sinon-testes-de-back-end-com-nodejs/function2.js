const fs = require('fs');

const function2 = (path, content) => {
  try {
    fs.writeFileSync(path, content)
    return 'ok';
  } catch (err) {
    return null;
  }
}

module.exports = function2;