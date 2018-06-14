import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'
{{#if isPage}}
import PageTitle from "@common/PageTitle"
{{/if}}
{{#if hasTime}}
import TimeSwitch from "@common/TimeSwtich"
{{/if}}

import * as actions from '@actions/{{name}}'
import styles from './index.cssmodule.styl'

{{{imports}}}

{{#if hasTime}}
const timeList = ["24小时", "7天"];
const longTimeList = ["24小时", "7天", "30天"];
{{/if}}
@connect(
  (state, mapState) => state.{{state}},
  (dispatch, mapActions) => mapActions(actions, [
    {{{actionsStr}}}
  ])
)
@cssmodule(styles)
export default class {{upper name}} extends PureComponent {
  {{#if hasTime}}
  handleTimeChange = time => {
    this.handleConditionChange({
      time_range: time
    })
  }
  {{/if}}
  {{#if conditionComp}}
  handleConditionChange = condition => {
    const { {{conditionFn}}, {{getDataFn}} } = this.props
    {{conditionFn}}(condition)
    {{getDataFn}}(1)
  }
  {{/if}}
  render() {
    const {
      features,
      {{{data}}},
      {{{actions}}}
    } = this.props
    {{#if hasTime}}
    const _timeList = features.max_range_7d ? timeList : longTimeList;
    {{/if}}
    return (
      <div className="container-fluid">
        {{#if isPage}}
        <PageTitle name="{{title}}">
          {{#if hasTime}}
          <TimeSwitch
            timeRange={condition.time_range}
            options={_timeList}
            changeTimeRange={this.handleTimeChange}
          />
          {{/if}}
        </PageTitle>
        {{/if}}
        {{#if conditionComp}}
        {{{conditionComp}}}
        {{/if}}
        {{#if tableComp}}
        {{{tableComp}}}
        {{/if}}
        {{#each modals}}
        {{{this.container.component}}}
        {{/each}}
      </div>
    )
  }
}