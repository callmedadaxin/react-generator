import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'

import * as actions from '@actions/host'
import styles from './index.cssmodule.styl'

import hostListTable from './hostListTable'
import hostDataModal from './hostDataModal'
import hostDataFetchModal from './hostDataFetchModal'
import hostDataEditModal from './hostDataEditModal'

@connect(
  (state, mapState) => state.Host,
  (dispatch, mapActions) => mapActions(actions, [
    'gethostList',
'showhostDataModal',
'hidehostDataModal',
'showhostDataFetchModal',
'hidehostDataFetchModal',
'edithostDataEditModal',
'showhostDataEditModal',
'hidehostDataEditModal'
  ])
)
@cssmodule(styles)
export default class Host extends PureComponent {
  render() {
    const {
      hostList,
hostDataModalData,
hostDataFetchModalData,
hostDataEditModalData,
      gethostList,
showhostDataModal,
hidehostDataModal,
showhostDataFetchModal,
hidehostDataFetchModal,
edithostDataEditModal,
showhostDataEditModal,
hidehostDataEditModal
    } = this.props
    return (
      <Fragment>
        <Box data border title="告警主机">
          <HostListTable
  getList={ gethostList }
  data={ hostList } />
        </Box>
        <HostDataModal
  handleCancel={ hidehostDataModal }
  data={ hostDataModalData } />
        <HostDataFetchModal
  handleCancel={ hidehostDataFetchModal }
  data={ hostDataFetchModalData } />
        <HostDataEditModal
  handleEnsure={ edithostDataEditModal }
  handleCancel={ hidehostDataEditModal }
  data={ hostDataEditModalData } />
      </Fragment>
    )
  }
}