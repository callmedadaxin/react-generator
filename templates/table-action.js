const get{{name}}Fn = params => {
  return {
    url: '{{url}}',
    action: '{{action}}',
    params,
    handleResult: {{#if handler}}{{{handler}}}{{else}}res.data{{/if}}
  }
}
export const get{{name}} = params => (dispatch, getState) => {
  {{#if paramsHandler}}
  {{{paramsHandler}}}
  {{/if}}
  dispatch(get{{name}}Fn(params))
}