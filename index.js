const compile = require('./comileTpl')
const getTable = require('./table')
const getModal = require('./modal')
const getCondition = require('./condition')
let dir = require('./dir')
const { toUpperCase } = require('./util')

const componentPath = './templates/component.js'
const containerPath = './templates/container.js'
const chalk = require('chalk');

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

const renderComponent = (config, childConfig, isAdd) => {
  const { table, modals, condition } = childConfig
  const componentDir = !config.isChild
    ? `components/${config.name}`
    : `components/${config.path}`
  const defines = getDefines(config, childConfig)
  
  if (!isAdd) {
    // 创建文件夹
    dir.make(componentDir)

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
  }

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
  return defines
}

const renderActions = (config, childConfig, isAdd) => {
  const { table, modals, condition } = childConfig
  const actions = []
  const componentDir = `actions/${config.path || config.name}`
  const postImp = `import { post } from '@common/ajax'\n\n`

  if (!isAdd) {
    // 创建文件夹
    dir.make(componentDir)
    if (table.hasPost) {
      actions.push(postImp)
    }
  }

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

  if (isAdd) {
    const curContent = dir.read(`${componentDir}/index.js`)
    let ret = curContent + actions.join('')
    if (curContent.indexOf(postImp) < 0) {
      ret = postImp + ret
    }
    dir.write(`${componentDir}/index.js`, ret)
  } else {
    dir.write(`${componentDir}/index.js`, actions.join(''))
  }
}

const renderReducers = (config, childConfig, isAdd) => {
  const { table, modals, condition } = childConfig
  const reducers = []
  const componentDir = `reducers/${toUpperCase(config.path || config.name)}`
  let exportsName = []

  if (!isAdd) {
    // 创建文件夹
    dir.make(componentDir)
    reducers.push(`import { combinceReducer } from '@common/easy'`)
  }

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

  if (!isAdd) {
    // exports
    reducers.push(`
export default combinceReducer({
  ${exportsName.join(',\n')}
}${!config.isChild ? `, '${config.namespace}'`: ''})
`)
  
    dir.write(`${componentDir}/index.js`, reducers.join('\n'))
  } else {
    const curContent = dir.read(`${componentDir}/index.js`)
    const start = curContent.indexOf('export default combinceReducer({')
    const end = curContent.lastIndexOf(
      `}${!config.isChild ? `, '${config.namespace}'`: ''})`
    )
    if (start > 0 && end > 0) {
      const names = curContent.slice(
        start + 'export default combinceReducer({'.length,
        end
      ).split(',\n').filter(item => item)
      names.push(exportsName)
      reducers.push(`
export default combinceReducer({
  ${names.join(',\n')}
}${!config.isChild ? `, '${config.namespace}'`: ''})
`)
      dir.write(`${componentDir}/index.js`,
        curContent.slice(0, start) + reducers.join('\n'))
    }
  }
}

exports.render = (config) => {
  dir = dir(config)
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
  console.log(chalk.green(`${config.name}相关文件全部生成成功!`))
}

exports.add = (config) => {
  dir = dir(config)
  
  if (config.table) {
    const childConfig = {
      table: getTable(config.table, config.namespace, config),
      modals: config.modals ? config.modals.map(((modal) => {
        return getModal(modal, config.namespace, config)
      })) : [],
      condition: getCondition(config.condition, config.namespace, config)
    }
    const defines = renderComponent(config, childConfig, true)
    renderActions(config, childConfig, true)
    renderReducers(config, childConfig, true)
    console.log(`追加成功!`)
    console.log(`请在components/${config.name}/index.js中添加以下处理:`)
    console.log(`
      添加引用:
      ${defines.imports.join('\n')}
    `)
    console.log(`
      添加actions:
      ${defines.actions.join(',')}
    `)
    console.log(`
      添加props传递:
      ${defines.data.join(',')}
    `)
  }
}

