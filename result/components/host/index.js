import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'

import * as actions from '@actions/configure'
import styles from './index.cssmodule.styl'

import hostListTable from './hostListTable'

@connect(
  (state, mapState) => {},
  (dispatch, mapActions) => mapActions(actions, [
    gethostList
  ])
)
@cssmodule(styles)
export default class Host extends PureComponent {
  render() {
    const {
      hostList,
      gethostList
    } = this.props
    return (
      <Box data border title=告警主机>
        <HostListTable
  getList={ gethostList }
  data={ hostList } />
      </Box>
    )
  }
}