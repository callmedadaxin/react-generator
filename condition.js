
const compile = require('./comileTpl')
const reducerPath = './templates/condition/reducer.js'
const actionPath = './templates/condition/action.js'
const componentPath = './templates/condition/comp.js'
const componentDefinePath = './templates/condition/define.js'
const toUpperCase = require('./util').toUpperCase

const config = require('./config').condition

const getNamespace = (cur, config) => {
  return cur === '/'
    ? cur + config.name + '/'
    : cur + '/' + config.name + '/'
}

const getReducerStr = (config) => {
  const conditionDefault = config.fields.reduce((obj, item) => {
    obj[item.key] = item.default || `''`
    return obj
  }, {})
  const reducerConfig = {
    name: config.name,
    defaultValue: JSON.stringify(conditionDefault).replace(/"/g, '')
  }
  return compile(reducerPath, reducerConfig)
}

const getContainerConfig = (config) => {
  return {
    imports: [
      `import ${toUpperCase(config.name)} from './${config.name}'`
    ],
    actions: [
      `change${toUpperCase(config.name)}`
    ],
    data: [
      config.name
    ],
    component: compile(componentDefinePath, {
      name: config.name
    })
  }
}

const getActionStr = (config, namespace = '/') => {
  const retNameSpace = getNamespace(namespace, config)
  const action = retNameSpace + config.fetch

  return compile(actionPath, {
    name: config.name,
    namespace: retNameSpace
  })
}

const getComponentStr = (config) => {
  return compile(componentPath, {
    name: config.name,
    fields: config.fields
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
    container: getContainerConfig(cfg)
  }
}