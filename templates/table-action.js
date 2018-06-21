{{#if hasPost}}
import { post } from '@common/ajax'
{{/if}}

const get{{upper name}}Fn = params => {
  return {
    url: '{{url}}',
    action: '{{action}}',
    params,
    handleResult: {{#if handler}}{{{handler}}}{{else}}res.data{{/if}}
  }
}
// 获取列表
export const get{{upper name}} = (page = 1) => (dispatch, getState) => {
  {{#if paramsHandler}}
  {{{paramsHandler}}}
  {{/if}}
  dispatch(get{{upper name}}Fn(params))
}

{{#if del}}
// 删除操作
export const delete{{upper name}}Item = params => (dispatch, getState) => {
  {{#if del.paramsHandler}}
  {{{del.paramsHandler}}}
  {{/if}}
  post('{{del.url}}', params)
    .then(res => res.json())
    .then(res => {
      get{{upper name}}(1)(dispatch, getState)
      return res.data
    })
}
{{/if}}

{{#if status}}
// 修改状态
export const change{{upper name}}Item = params => (dispatch) => {
  {{#if status.paramsHandler}}
  {{{status.paramsHandler}}}
  {{/if}}
  post('{{status.url}}', params)
    .then(res => res.json())
    .then(res => {
      get{{upper name}}(1)(dispatch, getState)
      return res.data
    })
}
{{/if}}
