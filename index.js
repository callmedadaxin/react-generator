const compile = require('./comileTpl')
const getTable = require('./table')
const getModal = require('./modal')
const dir = require('./dir')

const componentPath = './templates/component.js'
const actionPath = './templates/action.js'
const reducerPath = './templates/reducer.js'

const config = require('./config')

const renderComponent = (config, childConfig) => {
  const { table, modals } = childConfig
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

  // modal
  modals.forEach(modal => {
    dir.make(`${componentDir}/${modal.name}Modal`)
    dir.write(`${componentDir}/${modal.name}Modal/index.js`, modal.component)
    dir.write(`${componentDir}/${modal.name}Modal/index.cssmodule.styl`, '')
  })
}

const renderActions = (config, childConfig) => {
  const { table, modals } = childConfig
  const actions = []
  const componentDir = `actions/${config.name}`
  // 创建文件夹
  dir.make(componentDir)

  // table
  actions.push(table.actions)

  // modal
  modals.forEach(modal => {
    actions.push(modal.actions)
  })

  dir.write(`${componentDir}/index.js`, actions.join('\n\n'))
}

const renderReducers = (config, childConfig) => {
  const { table, modals } = childConfig
  const reducers = []
  const componentDir = `reducers/${config.name}`
  // 创建文件夹
  dir.make(componentDir)

  reducers.push(table.reducers)

  // modal
  modals.forEach(modal => {
    reducers.push(modal.reducers)
  })

  dir.write(`${componentDir}/index.js`, reducers.join('\n\n'))
}

const render = (config) => {
  const childConfig = {
    table: getTable(config.table),
    modals: config.modals ? config.modals.map(getModal) : []
  }
  renderComponent(config, childConfig)
  renderActions(config, childConfig)
  renderReducers(config, childConfig)
}

render(config)

