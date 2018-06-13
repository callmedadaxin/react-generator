const Handle = require('handlebars')
const fs = require('fs')
const path = require('path')

const resolve = p => path.resolve(__dirname, p)

const formatObjStr = obj => {
  if (Array.isArray(obj)) {
    return obj.map(formatObjStr)
  }

  return Object.keys(obj).reduce((o, key) => {
    const item = obj[key]
    if (typeof(item) === 'object') {
      obj[key] = formatObjStr(item)
      return obj
    }
    if (typeof(item) === 'string') {
      obj[key] = `'${item}'`
      return obj
    }
    obj[key] = item
    return obj
  }, {})
} 
const getObjectStr = obj => {
  const ret = JSON.stringify(formatObjStr(obj)) || ''
  return ret.replace(/"/g, '')
}

Handle.registerHelper('upper', name => {
  return name.split('').map((item, index) => {
    return index === 0 ? item.toUpperCase() : item
  }).join('')
})

const formMap = {
  Input: () => `<Input />`,
  Textarea: () => `<Input type="textarea" />`,
  Radio: (field) => {
    return `<RadioGroup>
      ${field.options.map(option => {
        return `<Radio label="${option.label}" value="${option.value}" />`
      }).join('\n')}
    </RadioGroup>`
  },
  Checkbox: (field) => {
    return `<CheckboxGroup>
      ${field.options.map(option => {
        return `<Checkbox label="${option.label}" value="${option.value}" />`
      }).join('\n')}
    </CheckboxGroup>`
  },
  Select: field => `<Select options={fields.${field.key}.options} ${field.multi ? 'multi' : ''} />`,
  MultiInput: () => `<MultiInput />`,
  DateRangePicker: () => `<DateRangePicker />`,
  LabelSelect: (field) => `<LabelSelect options={fields.${field.key}.options} />`
}

const getDefault = (item) => {
  return {
    Input: "''",
    Textarea: "''",
    Radio: "''",
    Select: "''",
    MultiInput: '[]'
  }[item.type] || "''"
}

Handle.registerHelper('field', fields => {
  return fields.map(field => {
    return `<div className="row">
      <FormItem label="${field.label}" field="${field.key}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ''}>
        ${formMap[field.type](field)}
      </FormItem>
    </div>`
  }).join(`\n`)
})

Handle.registerHelper('fieldObject', fields => {
  let ret = []
  
  fields.forEach(item => {
    ret.push(
      `${item.key}: {
        value: data.${item.key} || ${getDefault(item)}${item.validators ? `,\nvalidators: ${getObjectStr(item.validators)}` : ''}${item.options ? `,\noptions: ${getObjectStr(item.options)}` : ''}
      }`,
    )
  })
  return ret.join(',\n')
})

Handle.registerHelper('fieldImport', fields => {
  const ret = fields.map(item => item.type)
  
  return ret.filter((item, index) => ret.indexOf(item) === index)
    .join(', ')
})

module.exports = (path, data) => {
  const tpl = fs.readFileSync(resolve(path), 'utf8')
  return Handle.compile(tpl)(data)
}