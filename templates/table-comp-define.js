<{{upper name}}Table
  {{#if getListFn}}
  getList={ {{getListFn}} }
  {{/if}}
  {{#if edit}}
  show{{upper edit.modal}}Modal={show{{upper edit.modal}}Modal}
  editModalData={ {{edit.modal}}ModalData }
  {{/if}}
  {{#if del}}
  delete{{upper name}}Item={delete{{upper name}}Item}
  {{/if}}
  {{#if status}}
  change{{upper name}}Item={change{{upper name}}Item}
  {{/if}}
  data={ {{data}} } />