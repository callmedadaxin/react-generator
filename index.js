const compile = require('./comileTpl')
const getTable = require('./table')
const getModal = require('./modal')
const getCondition = require('./condition')
const config = require('./config')
const dir = require('./dir')(config)
const { toUpperCase } = require('./util')

const componentPath = './templates/component.js'
const containerPath = './templates/container.js'

const getDefines = (config, childConfig) => {
  const ret = {
    imports: [],
    actions: [],
    data: []
  }
  const { table, modals, condition } = childConfig
  const concat = item => {
    ret.imports = ret.imports.concat(item.imports)
    ret.actions = ret.actions.concat(item.actions)
    ret.data = ret.data.concat(item.data)
  }
  config.condition && concat(condition.container)
  config.table && concat(table.container)
  modals.forEach(modal => concat(modal.container))

  return ret
}

const renderComponent = (config, childConfig) => {
  const { table, modals, condition } = childConfig
  const componentDir = !config.isChild
    ? `components/${config.name}`
    : `components/${config.path}`

  // 创建文件夹
  dir.make(componentDir)

  const defines = getDefines(config, childConfig)

  // index.js
  dir.write(`${componentDir}/index.js`, compile(componentPath, {
    ...config,
    imports: defines.imports.join('\n'),
    actionsStr: defines.actions.map(item => `'${item}'`).join(',\n'),
    actions: defines.actions.join(',\n'),
    data: defines.data.join(',\n'),
    title: config.title,
    name: config.name,
    tableComp: config.table ? table.container.component : '',
    modals,
    conditionComp: config.condition ? condition.container.component : '',
    conditionFn: config.condition ? `change${toUpperCase(condition.name)}` : '',
    getDataFn: config.table ? `get${toUpperCase(table.name)}` : '',
    state: !config.isChild ? toUpperCase(config.name) : toUpperCase(config.path.split('/').join('.')),
    action: config.path || config.name
  }))
  if (config.hasContainer) {
    dir.write(`containers/${toUpperCase(config.name)}.js`, compile(containerPath, {
      ...config
    }))
  }
  // index.css
  dir.write(`${componentDir}/index.cssmodule.styl`, '')

  if (config.condition) {
    // condition
    dir.make(`${componentDir}/${condition.name}`)
    dir.write(`${componentDir}/${condition.name}/index.js`, condition.component)
    dir.write(`${componentDir}/${condition.name}/index.cssmodule.styl`, '')
  }

  // table
  if (config.table) {
    dir.make(`${componentDir}/${table.name}Table`)
    dir.write(`${componentDir}/${table.name}Table/index.js`, table.component)
    dir.write(`${componentDir}/${table.name}Table/index.cssmodule.styl`, '')
  }

  // modal
  if (config.modals) {
    modals.forEach(modal => {
      dir.make(`${componentDir}/${modal.name}Modal`)
      dir.write(`${componentDir}/${modal.name}Modal/index.js`, modal.component)
      dir.write(`${componentDir}/${modal.name}Modal/index.cssmodule.styl`, '')
    })
  }
}

const renderActions = (config, childConfig) => {
  const { table, modals, condition } = childConfig
  const actions = []
  const componentDir = `actions/${config.path || config.name}`
  // 创建文件夹
  dir.make(componentDir)

  // table
  if (config.table) {
    actions.push(table.actions)
  }

  // condition
  if (config.condition) {
    actions.push(condition.actions)
  }

  // modal
  if (config.modals) {
    modals.forEach(modal => {
      actions.push(modal.actions)
    })
  }

  dir.write(`${componentDir}/index.js`, actions.join(''))
}

const renderReducers = (config, childConfig) => {
  const { table, modals, condition } = childConfig
  const reducers = [`import { combinceReducer } from '@common/easy'`]
  const componentDir = `reducers/${toUpperCase(config.path || config.name)}`
  let exportsName = []
  // 创建文件夹
  dir.make(componentDir)

  // condition
  if (config.condition) {
    reducers.push(condition.reducers)
    exportsName = exportsName.concat(condition.container.data)
  }
  // table
  if (config.table) {
    reducers.push(table.reducers)
    exportsName = exportsName.concat(table.container.data)
  }

  // modal
  if (config.modals) {
    modals.forEach(modal => {
      reducers.push(modal.reducers)
      exportsName = exportsName.concat(modal.container.data)
    })
  }
  // exports
  reducers.push(`
export default combinceReducer({
  ${exportsName.join(',\n  ')}
}${!config.isChild ? `, '${config.namespace}'`: ''})
`)

  dir.write(`${componentDir}/index.js`, reducers.join('\n'))
}

const render = (config) => {
  const childConfig = {
    table: getTable(config.table, config.namespace, config),
    modals: config.modals ? config.modals.map(((modal) => {
      return getModal(modal, config.namespace, config)
    })) : [],
    condition: getCondition(config.condition, config.namespace, config)
  }
  renderComponent(config, childConfig)
  renderActions(config, childConfig)
  renderReducers(config, childConfig)
}

render(config)

