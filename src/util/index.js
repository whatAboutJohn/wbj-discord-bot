export function readDir(_path) {
  const fs = require('fs');

  if (!_path) throw new Error('You must specify a path');

  return fs.readdirSync(_path)
    .filter(file => /^(?!.*(-spec|index).*).+\.js$/i.test(file))
    .map(file => file.slice(0, -3));
}
