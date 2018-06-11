
const compile = require('./comileTpl')
const reducerPath = './templates/modal/modal-reducer.js'
const actionShowPath = './templates/modal/modal-show-action.js'
const actionEditPath = './templates/modal/modal-edit-action.js'
const componentShowPath = './templates/modal/modal-show-comp.js'
const componentEditPath = './templates/modal/modal-edit-comp.js'
const componentDefinePath = './templates/modal/modal-comp-define.js'
const config = require('./config').modals[1]

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
      `import ${config.name}Modal from './${config.name}Modal'`
    ],
    actions: [
      `show${config.name}Modal`,
      `hide${config.name}Modal`,
    ],
    data: [
      `${config.name}ModalData`
    ],
    component: compile(componentDefinePath, {
      isEdit: config.type === 'edit',
      name: config.name,
      hideModal: `hide${config.name}Modal`,
      data: `${config.name}ModalData`
    })
  }
}

const getActionStr = (config, namespace = '/') => {
  const retNameSpace = getNamespace(namespace, config)
  const action = retNameSpace + config.fetch
  const tpl = config.type === 'show' ? actionShowPath : actionEditPath

  return compile(tpl, {
    name: config.name,
    fetch: config.fetch,
    url: config.url,
    action,
    handler: config.resHandler,
    paramsHandler: config.paramsHandler
  })
}

const getComponentStr = (config) => {
  const tpl = config.type === 'show' ? componentShowPath : componentEditPath
  return compile(tpl, {
    name: config.name
  })
}

// console.log(getReducerStr(config))
// console.log(getActionStr(config))
// console.log(getComponentStr(config))
// console.log(getContainerConfig(config))

module.exports = (cfg = config) => {
  return {
    name: cfg.name,
    component: getComponentStr(cfg),
    actions: getActionStr(cfg),
    reducers: getReducerStr(cfg),
    container: getContainerConfig(cfg)
  }
}