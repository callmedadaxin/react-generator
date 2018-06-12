<{{upper name}}Table
  {{#if getListFn}}
  getList={ {{getListFn}} }
  {{/if}}
  {{#if edit}}
  show{{edit.modal}}Modal={show{{edit.modal}}Modal}
  {{/if}}
  {{#if del}}
  delete{{name}}Item={delete{{name}}Item}
  {{/if}}
  {{#if status}}
  change{{name}}Item={change{{name}}Item}
  {{/if}}
  data={ {{data}} } />