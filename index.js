const compile = require('./comileTpl')
const getTable = require('./table')
const getModal = require('./modal')
const getCondition = require('./condition')
const dir = require('./dir')
const { toUpperCase } = require('./util')

const componentPath = './templates/component.js'
const actionPath = './templates/action.js'
const reducerPath = './templates/reducer.js'

const config = require('./config')

const getDefines = (config) => {
  const ret = {
    imports: [],
    actions: [],
    data: []
  }
  const { table, modals, condition } = config
  const concat = item => {
    ret.imports = ret.imports.concat(item.imports)
    ret.actions = ret.actions.concat(item.actions)
    ret.data = ret.data.concat(item.data)
  }
  concat(condition.container)
  concat(table.container)
  modals.forEach(modal => concat(modal.container))

  return ret
}

const renderComponent = (config, childConfig) => {
  const { table, modals, condition } = childConfig
  const componentDir = `components/${config.name}`
  // 创建文件夹
  dir.make(componentDir)

  const defines = getDefines(childConfig)

  // index.js
  dir.write(`${componentDir}/index.js`, compile(componentPath, {
    ...config,
    imports: defines.imports.join('\n'),
    actionsStr: defines.actions.map(item => `'${item}'`).join(',\n'),
    actions: defines.actions.join(',\n'),
    data: defines.data.join(',\n'),
    title: config.title,
    name: config.name,
    tableComp: table.container.component,
    modals,
    conditionComp: condition.container.component,
    conditionFn: `change${toUpperCase(condition.name)}`
  }))

  // index.css
  dir.write(`${componentDir}/index.cssmodule.styl`, '')

  // condition
  dir.make(`${componentDir}/${condition.name}`)
  dir.write(`${componentDir}/${condition.name}/index.js`, condition.component)
  dir.write(`${componentDir}/${condition.name}/index.cssmodule.styl`, '')

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
  const { table, modals, condition } = childConfig
  const actions = []
  const componentDir = `actions/${config.name}`
  // 创建文件夹
  dir.make(componentDir)

  // condition
  actions.push(condition.actions)

  // table
  actions.push(table.actions)

  // modal
  modals.forEach(modal => {
    actions.push(modal.actions)
  })

  dir.write(`${componentDir}/index.js`, actions.join('\n\n'))
}

const renderReducers = (config, childConfig) => {
  const { table, modals, condition } = childConfig
  const reducers = [`import { combinceReducer } from '@common/easy'`]
  const componentDir = `reducers/${config.name}`
  let exportsName = []
  // 创建文件夹
  dir.make(componentDir)

  // condition
  reducers.push(condition.reducers)
  exportsName = exportsName.concat(condition.container.data)

  reducers.push(table.reducers)
  exportsName = exportsName.concat(table.container.data)

  // modal
  modals.forEach(modal => {
    reducers.push(modal.reducers)
    exportsName = exportsName.concat(modal.container.data)
  })

  // exports
  reducers.push(`
export default combinceReducer({
  ${exportsName.join(',\n  ')}
}, '${config.namespace}')
`)

  dir.write(`${componentDir}/index.js`, reducers.join('\n\n'))
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

