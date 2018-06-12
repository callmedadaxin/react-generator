import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'
import { connect } from '@common/easy'

import { Box } from '@common/lib'

import * as actions from '@actions/{{name}}'
import styles from './index.cssmodule.styl'

{{{imports}}}

@connect(
  (state, mapState) => state.{{upper name}},
  (dispatch, mapActions) => mapActions(actions, [
    {{{actionsStr}}}
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
      <Fragment>
        <Box data border title="{{{title}}}">
          {{{tableComp}}}
        </Box>
        {{#each modals}}
        {{{this.container.component}}}
        {{/each}}
      </Fragment>
    )
  }
}