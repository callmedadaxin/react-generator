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
import hostListTable from './hostListTable'
import hostDataModal from './hostDataModal'
import hostDataFetchModal from './hostDataFetchModal'
import hostDataEditModal from './hostDataEditModal'

const timeList = ["24小时", "7天"];
const longTimeList = ["24小时", "7天", "30天"];
@connect(
  (state, mapState) => state.Host,
  (dispatch, mapActions) => mapActions(actions, [
    'changeCondition',
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
  handleTimeChange = time => {
    const { changeCondition } = this.props
    changeCondition({
      time_range: time
    })
  }
  render() {
    const {
      features,
      condition,
hostList,
hostDataModalData,
hostDataFetchModalData,
hostDataEditModalData,
      changeCondition,
gethostList,
showhostDataModal,
hidehostDataModal,
showhostDataFetchModal,
hidehostDataFetchModal,
edithostDataEditModal,
showhostDataEditModal,
hidehostDataEditModal
    } = this.props
    const _timeList = features.max_range_7d ? timeList : longTimeList;
    return (
      <div className="container-fluid">
        <PageTitle name="告警主机">
          <TimeSwitch
            timeRange={condition.time_range}
            options={_timeList}
            changeTimeRange={this.handleTimeChange}
          />
        </PageTitle>
        <Condition
  handleConditionChange={ changeCondition }
  data={ condition } />
        <HostListTable
  getList={ gethostList }
  showhostDataEditModal={showhostDataEditModal}
  deletehostListItem={deletehostListItem}
  changehostListItem={changehostListItem}
  data={ hostList } />
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
      </div>
    )
  }
}