import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'

import EnterEnsure from "@common/EnterEnsure"
import { Box, Form, Button, Input, Select } from '@common/lib'

import styles from './index.cssmodule.styl'

const FormItem = Form.Item

@EnterEnsure
@cssmodule(styles)
export default class Condition extends PureComponent {
  handleEnsure = () => {
    const {handleConditionChange} = this.props
    const ret = this.form.validateAndSubmit()
    if (ret) {
      handleConditionChange(ret)
    }
  }
  initFields(data) {
    return {
      name: {
        value: data.name || '',
        validators: [{
          required: true
        }]
      },
      city: {
        value: data.city || '',
        options: [{
          label: '111',
          value: 1
        }, {
          label: '222',
          value: 2
        }]
      }
    }
  }
  render() {
    const {data} = this.props
    const fields = this.initFields(data)
    return (
      <Box data border>
        <Form data={ fields } ref={ form => (this.form = form) }>
          <div className="row">
            <FormItem label="姓名"
              field="name"
              placeholder="测试">
              <Input />
            </FormItem>
          </div>
          <div className="row">
            <FormItem label="城市" field="city">
              <Select options={ fields.city.options } />
            </FormItem>
          </div>
        </Form>
        <div className="right-block">
          <Button onClick={ this.handleEnsure }>
            搜索
          </Button>
        </div>
      </Box>
    )
  }
}