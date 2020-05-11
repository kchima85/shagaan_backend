const fs = require('fs');

module.exports = (path) => {
  const fileNames = fs.readdirSync(path);
  const fileObj = {};
  fileNames.forEach((fileName) => {
    const file = fs.readFileSync(`${path}${fileName}`, 'UTF-8');
    const formmatedName = fileName.replace(/(.sql|.js)/, '');

    fileObj[`${formmatedName}`] = file;
  });
  return fileObj;
};
