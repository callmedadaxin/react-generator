import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'
import PageTitle from "@common/PageTitle"

import * as actions from '@actions/reportCenter'
import styles from './index.cssmodule.styl'

import Condition from './condition'
import ReportListTable from './reportListTable'
import ReportEditModal from './reportEditModal'

@connect(
  (state, mapState) => state.ReportCenter,
  (dispatch, mapActions) => mapActions(actions, [
    'changeCondition',
    'getReportList',
    'deleteReportListItem',
    'editReportEditModal',
    'showReportEditModal',
    'hideReportEditModal'
  ])
)
@cssmodule(styles)
export default class ReportCenter extends PureComponent {
  handleConditionChange = condition => {
    const {changeCondition, getReportList} = this.props
    changeCondition(condition)
    getReportList(1)
  }
  render() {
    const {features, condition, reportList, reportEditModalData, changeCondition, getReportList, deleteReportListItem, editReportEditModal, showReportEditModal, hideReportEditModal} = this.props
    return (
      <div className="container-fluid">
        <PageTitle name="报告中心">
        </PageTitle>
        <Condition handleConditionChange={ this.handleConditionChange } data={ condition } />
        <ReportListTable getList={ getReportList }
          showReportEditModal={ showReportEditModal }
          editModalData={ reportEditModalData }
          deleteReportListItem={ deleteReportListItem }
          data={ reportList } />
        <ReportEditModal handleEnsure={ editReportEditModal }
          handleCancel={ hideReportEditModal }
          data={ reportEditModalData } />
      </div>
    )
  }
}