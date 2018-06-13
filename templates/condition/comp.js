import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'

import EnterEnsure from "@common/EnterEnsure"
import { Box, Form, Button,{{{fieldImport fields}}} } from '@common/lib'

import styles from './index.cssmodule.styl'

const FormItem = Form.Item

@EnterEnsure
@cssmodule(styles)
export default class {{ upper name }} extends PureComponent {
  handleEnsure = () => {
    const { handleConditionChange } = this.props
    const ret = this.form.validateAndSubmit()
    if (ret) {
      handleConditionChange(ret)
    }
  }
  initFields (data) {
    return {
      {{{fieldObject fields}}}
    }
  }
  render () {
    const { data } = this.props
    const fields = this.initFields(data)
    return (
      <Box data border>
        <Form data={fields} ref={input => (this.input = input)}>
          {{{field fields}}}
        </Form>
        <div className="right-block">
          <Button onClick={this.handleEnsure}>搜索</Button>
        </div>
      </Box>
    )
  }
}