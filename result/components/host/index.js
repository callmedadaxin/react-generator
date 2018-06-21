import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'
import PageTitle from "@common/PageTitle"
import TimeSwitch from "@common/TimeSwtich"

import * as actions from '@actions/host'
import styles from './index.cssmodule.styl'

import Condition from './condition'
import HostListTable from './hostListTable'
import HostDataModal from './hostDataModal'
import HostDataFetchModal from './hostDataFetchModal'
import HostDataEditModal from './hostDataEditModal'

const timeList = ["24小时", "7天"];
const longTimeList = ["24小时", "7天", "30天"];
@connect(
  (state, mapState) => state.Host,
  (dispatch, mapActions) => mapActions(actions, [
    'changeCondition',
    'getHostList',
    'deleteHostListItem',
    'changeHostListItem',
    'showHostDataModal',
    'hideHostDataModal',
    'showHostDataFetchModal',
    'hideHostDataFetchModal',
    'editHostDataEditModal',
    'showHostDataEditModal',
    'hideHostDataEditModal'
  ])
)
@cssmodule(styles)
export default class Host extends PureComponent {
  handleTimeChange = time => {
    this.handleConditionChange({
      time_range: time
    })
  }
  handleConditionChange = condition => {
    const {changeCondition, getHostList} = this.props
    changeCondition(condition)
    getHostList(1)
  }
  render() {
    const {features, condition, hostList, hostDataModalData, hostDataFetchModalData, hostDataEditModalData, changeCondition, getHostList, deleteHostListItem, changeHostListItem, showHostDataModal, hideHostDataModal, showHostDataFetchModal, hideHostDataFetchModal, editHostDataEditModal, showHostDataEditModal, hideHostDataEditModal} = this.props
    const _timeList = features.max_range_7d ? timeList : longTimeList;
    return (
      <div className="container-fluid">
        <PageTitle name="告警主机">
          <TimeSwitch timeRange={ condition.time_range }
            options={ _timeList }
            changeTimeRange={ this.handleTimeChange } />
        </PageTitle>
        <Condition handleConditionChange={ this.handleConditionChange } data={ condition } />
        <HostListTable getList={ getHostList }
          showHostDataEditModal={ showHostDataEditModal }
          editModalData={ hostDataEditModalData }
          deleteHostListItem={ deleteHostListItem }
          changeHostListItem={ changeHostListItem }
          data={ hostList } />
        <HostDataModal handleCancel={ hideHostDataModal } data={ hostDataModalData } />
        <HostDataFetchModal handleCancel={ hideHostDataFetchModal } data={ hostDataFetchModalData } />
        <HostDataEditModal handleEnsure={ editHostDataEditModal }
          handleCancel={ hideHostDataEditModal }
          data={ hostDataEditModalData } />
      </div>
    )
  }
}