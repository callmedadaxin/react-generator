import React, { PureComponent } from 'react'
import { connect } from '@common/easy'

import * as actions from '@actions/reportCenter'
import ReportCenterComp from '@components/reportCenter'

@connect(
  state => ({
    features: state.Main.features
  }),
  (dispatch, mapActions) => mapActions(actions, [])
)
export default class ReportCenter extends PureComponent {
  componentWillMount = () => {
  }
  componentDidMount = () => {
    document.title = "报告中心 - TDP"
  }
  render() {
    const {features} = this.props
    return (
      <ReportCenterComp features={ features } />
    )
  }
}