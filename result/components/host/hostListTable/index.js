import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'

import { Box, Table, Pagination } from '@common/lib'

import styles from './index.cssmodule.styl'

@cssmodule(styles)
export default class HostListTable extends PureComponent {
  columns = []

  render () {
    const { data, getList } = this.props
    const { list, loading, error, page } = data

    return (
      <Box data={list} isLoading={loading}>
        <Table data={list} columns={this.columns} />
        <div className="right-block">
          <Pagination
            current={page.cur_page}
            onChange={page => getList(page)}
            total={page.total_num}
            pageSize={page.page_items_num}
          />
        </div>
      </Box>
    )
  }
}