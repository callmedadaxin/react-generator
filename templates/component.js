import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'

import * as actions from '@actions/configure'
import styles from './index.cssmodule.styl'

{{{imports}}}

@connect(
  (state, mapState) => {},
  (dispatch, mapActions) => mapActions(actions, [
    {{{actions}}}
  ])
)
@cssmodule(styles)
export default class {{upper name}} extends PureComponent {
  render() {
    const {
      {{{data}}},
      {{{actions}}}
    } = this.props
    return (
      <Box data border title={{{title}}}>
        {{{tableComp}}}
      </Box>
    )
  }
}