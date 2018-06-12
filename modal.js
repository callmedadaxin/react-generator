
const compile = require('./comileTpl')
const reducerShowPath = './templates/modal/modal-show-reducer.js'
const reducerEditPath = './templates/modal/modal-edit-reducer.js'
const actionShowPath = './templates/modal/modal-show-action.js'
const actionEditPath = './templates/modal/modal-edit-action.js'
const componentShowPath = './templates/modal/modal-show-comp.js'
const componentEditPath = './templates/modal/modal-edit-comp.js'
const componentDefinePath = './templates/modal/modal-comp-define.js'
const config = require('./config').modals[2]

const getNamespace = (cur, config) => {
  return cur === '/'
    ? cur + config.name + '/'
    : cur + '/' + config.name + '/'
}

const getReducerStr = (config) => {
  const tpl = config.type === 'show' ? reducerShowPath : reducerEditPath
  const reducerConfig = {
    name: config.name,
    fetch: config.fetch
  }
  return compile(tpl, reducerConfig)
}

const getContainerConfig = (config) => {
  const isEdit = config.type === 'edit'
  return {
    imports: [
      `import ${config.name}Modal from './${config.name}Modal'`
    ],
    actions: [
      isEdit ? `edit${config.name}Modal` : '',
      `show${config.name}Modal`,
      `hide${config.name}Modal`,
    ].filter(item => item),
    data: [
      `${config.name}ModalData`
    ],
    component: compile(componentDefinePath, {
      isEdit: config.type === 'edit',
      name: config.name,
      hideModal: `hide${config.name}Modal`,
      editModal: `edit${config.name}Modal`,
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
    name: config.name,
    fields: config.fields,
    title: config.title
  })
}
module.exports = (cfg = config) => {
  return {
    name: cfg.name,
    component: getComponentStr(cfg),
    actions: getActionStr(cfg),
    reducers: getReducerStr(cfg),
    container: getContainerConfig(cfg)
  }
}