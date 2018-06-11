import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'

import { Box, Table{{#if pagination}}, Pagination{{/if}} } from '@common/lib'

import styles from './index.cssmodule.styl'

@cssmodule(styles)
export default class {{upper name}}Table extends PureComponent {
  columns = []

  render () {
    const { data{{#if pagination}}, getList{{/if}} } = this.props
    const { list, loading, error{{#if pagination}}, page{{/if}} } = data

    return (
      <Box data={list} isLoading={loading}>
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