
const compile = require('./comileTpl')
const reducerPath = './templates/table-reducer.js'
const actionPath = './templates/table-action.js'
const componentPath = './templates/table-comp.js'
const componentDefinePath = './templates/table-comp-define.js'
const { toUpperCase } = require('./util')

const getNamespace = (cur, config) => {
  return cur === '/'
    ? cur + config.name + '/'
    : cur + '/' + config.name + '/'
}

const getReducerStr = (config) => {
  const reducerConfig = {
    name: config.name,
    fetch: config.fetch
  }
  return compile(reducerPath, reducerConfig)
}

const getContainerConfig = (config) => {
  return {
    imports: [
      `import ${toUpperCase(config.name)}Table from './${config.name}Table'`
    ],
    actions: [
      `get${toUpperCase(config.name)}`,
      config.del ? `delete${toUpperCase(config.name)}Item` : '',
      config.status ? `change${toUpperCase(config.name)}Item` : ''
    ].filter(item => item),
    data: [
      config.name
    ],
    component: compile(componentDefinePath, {
      name: config.name,
      getListFn: config.pagination ? `get${toUpperCase(config.name)}` : false,
      data: config.name,
      add: config.add,
      edit: config.edit,
      del: config.del,
      status: config.status
    })
  }
}

const getActionStr = (config, namespace = '/') => {
  const retNameSpace = getNamespace(namespace, config)
  const action = retNameSpace + config.fetch

  return compile(actionPath, {
    name: config.name,
    fetch: config.get,
    url: config.url,
    action,
    handler: config.resHandler,
    paramsHandler: config.paramsHandler,
    add: config.add,
    edit: config.edit,
    del: config.del,
    status: config.status
  })
}

const getComponentStr = (config) => {
  return compile(componentPath, {
    name: config.name,
    getList: `get${config.name}`,
    pagination: config.pagination,
    add: config.add,
    edit: config.edit,
    del: config.del,
    status: config.status,
    hasAlert: Boolean(config.add || config.edit)
  })
}

// console.log(getReducerStr(config))
// console.log(getActionStr(config))
// console.log(getComponentStr(config))
// console.log(getContainerConfig(config))

module.exports = (cfg = config, namespace) => {
  return {
    name: cfg.name,
    component: getComponentStr(cfg),
    actions: getActionStr(cfg, namespace),
    reducers: getReducerStr(cfg),
    container: getContainerConfig(cfg),
    hasPost: Boolean(cfg.del || cfg.status)
  }
}