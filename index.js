const compile = require('./comileTpl')
const getTable = require('./table')
const dir = require('./dir')

const componentPath = './templates/component.js'
const actionPath = './templates/action.js'
const reducerPath = './templates/reducer.js'

const config = require('./config')

const renderComponent = (config, childConfig) => {
  const { table } = childConfig
  const componentDir = `components/${config.name}`
  // 创建文件夹
  dir.make(componentDir)

  // index.js
  dir.write(`${componentDir}/index.js`, compile(componentPath, {
    ...table.container,
    title: config.title,
    name: config.name,
    tableComp: table.container.component
  }))

  // index.css
  dir.write(`${componentDir}/index.cssmodule.styl`, '')

  // table
  dir.make(`${componentDir}/${table.name}Table`)
  dir.write(`${componentDir}/${table.name}Table/index.js`, table.component)
  dir.write(`${componentDir}/${table.name}Table/index.cssmodule.styl`, '')
}

const renderActions = (config, childConfig) => {
  const { table } = childConfig
  const actions = []
  const componentDir = `actions/${config.name}`
  // 创建文件夹
  dir.make(componentDir)

  actions.push(table.actions)

  dir.write(`${componentDir}/index.js`, actions.join('\n'))
}

const renderReducers = (config, childConfig) => {
  const { table } = childConfig
  const reducers = []
  const componentDir = `reducers/${config.name}`
  // 创建文件夹
  dir.make(componentDir)

  reducers.push(table.reducers)

  dir.make(`${componentDir}/${table.name}`)
  dir.write(`${componentDir}/${table.name}/index.js`, reducers.join('\n'))
}

const render = (config) => {
  const childConfig = {
    table: getTable(config.table)
  }
  renderComponent(config, childConfig)
  renderActions(config, childConfig)
  renderReducers(config, childConfig)
}

render(config)

