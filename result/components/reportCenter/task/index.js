import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'

import * as actions from '@actions/reportCenter/task'
import styles from './index.cssmodule.styl'

import TaskListTable from './taskListTable'

@connect(
  (state, mapState) => state.ReportCenter.task,
  (dispatch, mapActions) => mapActions(actions, [
    'getTaskList',
    'deleteTaskListItem',
    'changeTaskListItem'
  ])
)
@cssmodule(styles)
export default class Task extends PureComponent {
  render() {
    const {features, taskList, getTaskList, deleteTaskListItem, changeTaskListItem} = this.props
    return (
      <div className="container-fluid">
        <TaskListTable getList={ getTaskList }
          showReportEditModal={ showReportEditModal }
          editModalData={ reportEditModalData }
          deleteTaskListItem={ deleteTaskListItem }
          changeTaskListItem={ changeTaskListItem }
          data={ taskList } />
      </div>
    )
  }
}