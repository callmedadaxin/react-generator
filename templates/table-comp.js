import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'

import { Box, Table{{#if pagination}}, Pagination{{/if}}{{#if hasAlert}}, Alert{{/if}} } from '@common/lib'
{{#if hasAlert}}
import Item from '@common/Item'
{{/if}}

import styles from './index.cssmodule.styl'

@cssmodule(styles)
export default class {{upper name}}Table extends PureComponent {
  columns = []

  {{#if add}}
  startAdd = () => {
    this.props.show{{add.modal}}Modal({}, 'new')
  }
  {{/if}}

  {{#if edit}}
  startEdit = (row) => {
    this.props.show{{edit.modal}}Modal(row, 'edit')
  }
  {{/if}}

  {{#if del}}
  startDelete = row => {
    const sure = window.confirm(`确认删除?`)

    if (sure) {
      this.props.delete{{name}}Item(row)
    }
  }
  {{/if}}

  {{#if status}}
  startDelete = row => {
    this.props.change{{name}}Item(row)
  }
  {{/if}}

  render () {
    const { data{{#if pagination}}, getList{{/if}}{{#if hasAlert}}, editModalData{{/if}} } = this.props
    const { list, loading, error{{#if pagination}}, page{{/if}} } = data
    {{#if hasAlert}}
    const { item, success, action } = editModalData
    {{/if}}

    return (
      <Box data={list} isLoading={loading}>
        {{#if add}}
        <Button type="secondary" className="mgb10 mgt10" onClick={this.startAdd}>+ {{add.btn}}</Button>
        {{/if}}
        {{#if hasAlert}}
        <Item show={success}>
          <Alert
            className="mgb10 mgt10"
            message={`${action === 'new' ? "创建" : "编辑"}成功！`}
            description={`已成功${action === 'new' ? "创建" : "编辑"}`}
          />
        </Item>
        {{/if}}
        <Table data={list} columns={this.columns} />
        {{#if pagination}}
        <div className="right-block">
          <Pagination
            current={page.cur_page}
            onChange={page => getList(page)}
            total={page.total_num}
            pageSize={page.page_items_num}
          />
        </div>
        {{/if}}
      </Box>
    )
  }
}