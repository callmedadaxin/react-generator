#! /usr/bin/env node

const program = require('commander')
const { render, add } = require('./index')
// const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const logError = msg => console.log(chalk.red(msg))

program
  .version('0.0.1')

program.command('init')
  .option('-c, --config [config]', '配置路径')
  .action(p => {
    p = p.config
    if (!p) {
      return logError('未输入配置路径')
    }
    try {
      const retPath = path.join(process.cwd(), p)
      const config = require(retPath)
      render(config)
    } catch (error) {
      console.log(error)
      logError('读取配置文件失败!')
    }
  })

program.command('add')
  .option('-c, --config [config]', '配置路径')
  .action(p => {
    p = p.config
    if (!p) {
      return logError('未输入配置路径')
    }
    try {
      const retPath = path.join(process.cwd(), p)
      const config = require(retPath)
      add(config)
    } catch (error) {
      console.log(error)
      logError('读取配置文件失败!')
    }
  })
  
program.command('config')
  .option('-p, --path [path]')
  .action(config => {
    const p = config.path
    const configData = fs.readFileSync(path.resolve(__dirname, './config.js'))
    if (!p) {
      console.log(configData)
    } else {
      fs.writeFileSync(p, configData, 'utf8')
      console.log(chalk.green(`基本配置文件生成成功: ${p}`))
    }
  })

program.parse(process.argv)




