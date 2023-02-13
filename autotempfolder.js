const crypto = require('crypto');
const {CONFIG_PATH} = require('./config')
const fs = require('fs')

function generateHashId(len=5) {
  const randomBytes = crypto.randomBytes(3);
  const hashId = randomBytes.toString('hex').substr(0, len);
  return hashId;
}

function createTempFolder() {
  // 读取CONFIG_PATH文件的内容
  const fileContent = fs.readFileSync(CONFIG_PATH, 'utf8');
  console.log('fileContent:',fileContent)
  const ctx = JSON.parse(fileContent);
  const {directory,isDirecotryReboot,cacheTime} = ctx
  const directoryWithHash = `${directory}/${generateHashId()}`
}

module.exports = {
  createTempFolder
}
