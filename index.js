const inquirer = require('inquirer');
const { createTempFolder } = require('./autotempfolder')
const path = require('path')
const os = require('os');
const mkdirp = require('mkdirp');
const { CONFIG_PATH } = require('./config')
const fs = require('fs')

const questions = [
  {
    type: 'input',
    name: 'directory',
    message: 'please input directory address(absolute path):',
    default: `${os.homedir()}/tmp`
  },
  {
    type: 'confirm',
    name: 'isDirecotryReboot',
    message: 'whether clean folder with reboot computer?:',
  },
  {
    type: 'list',
    name: 'cacheTime',
    message: 'how long auto clean?:',
    choices: ['1 day', '3 days', '1 week', 'never']
  }
];

const makeQuestion = async () => {
  const answer = await inquirer.prompt(questions)
  return answer
}

async function main() {
  // 判断在~/.cdtmp/config.json是否有这个文件
  const hasConfigFile = () => {
    return fs.existsSync(CONFIG_PATH)
  }

  const generateConfigFile = ({ cacheTime, isDirecotryReboot, directory }) => {
    const fs = require('fs')
    const configPath = PATH;
    const config = {
      directory,
      isDirecotryReboot,
      cacheTime
    }
    mkdirp.sync(path.dirname(configPath));
    fs.writeFileSync(configPath, JSON.stringify(config))
  }

  const hasConfig = hasConfigFile()
  console.log(hasConfig)
  if (!hasConfig) {
    // 创建文件
    const answer = await makeQuestion()
    generateConfigFile(answer)
  } else {
    createTempFolder()
  }
}

main()
