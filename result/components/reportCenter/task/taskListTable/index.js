import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'

import { Box, Table, Pagination, Alert } from '@common/lib'
import Item from '@common/Item'

import styles from './index.cssmodule.styl'

@cssmodule(styles)
export default class TaskListTable extends PureComponent {
  columns = []

  startEdit = (row) => {
    this.props.showReportEditModal(row, 'edit')
  }
  startDelete = row => {
    const sure = window.confirm(`确认删除?`)

    if (sure) {
      this.props.deleteTaskListItem(row)
    }
  }
  startChangeStatus = row => {
    this.props.changeTaskListItem(row)
  }
  render() {
    const {data, getList, editModalData} = this.props
    const {list, loading, error, page} = data
    const {item, success, action} = editModalData

    return (
      <Box data={ list }
        isLoading={ loading }
        border>
        <Item show={ success }>
          <Alert className="mgb10 mgt10"
            message={ `${action === 'new' ? "创建" : "编辑"}成功！` }
            description={ `已成功${action === 'new' ? "创建" : "编辑"}` } />
        </Item>
        <Table data={ list } columns={ this.columns } />
        <div className="mgt20 right-block">
          <Pagination current={ page.cur_page }
            onChange={ page => getList(page) }
            total={ page.total_num }
            pageSize={ page.page_items_num } />
        </div>
      </Box>
    )
  }
}