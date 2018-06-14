import React, { PureComponent } from 'react'
import { connect } from '@common/easy'

import * as actions from '@actions/{{name}}'
import {{upper name}}Comp from '@components/{{name}}'

@connect(
  state => ({
    features: state.Main.features
  }),
  (dispatch, mapActions) => mapActions(actions, [])
)
export default class {{upper name}} extends PureComponent {
  componentWillMount = () => {
  }
  componentDidMount = () => {
    document.title = "{{title}} - TDP"
  }
  render() {
    const { features } = this.props
    return (
      <{{upper name}}Comp features={features}/>
    )
  }
}