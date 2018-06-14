import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssmodule from 'react-css-modules'

import EnterEnsure from "@common/EnterEnsure"
import { Box, Form, Button,Input, Select } from '@common/lib'

import styles from './index.cssmodule.styl'

const FormItem = Form.Item

@EnterEnsure
@cssmodule(styles)
export default class Condition extends PureComponent {
  handleEnsure = () => {
    const { handleConditionChange } = this.props
    const ret = this.form.validateAndSubmit()
    if (ret) {
      handleConditionChange(ret)
    }
  }
  initFields (data) {
    return {
      creat_time: {
        value: data.creat_time || ''
      },
name: {
        value: data.name || ''
      },
report_type: {
        value: data.report_type || '',
options: [{label:'明细',value:'detail'},{label:'按主机聚合',value:'machine_agg'},{label:'按威胁事件聚合',value:'incident_agg'},{label:'威胁分析报告',value:'analysis'}]
      }
    }
  }
  render () {
    const { data } = this.props
    const fields = this.initFields(data)
    return (
      <Box data border>
        <Form data={fields} ref={form => (this.form = form)}>
          <div className="row">
      <FormItem label="时间筛选" field="creat_time">
        <Input />
      </FormItem>
    </div>
<div className="row">
      <FormItem label="报告名称" field="name" placeholder="按名称搜索">
        <Input />
      </FormItem>
    </div>
<div className="row">
      <FormItem label="报告类型" field="report_type" placeholder="选择报告类型">
        <Select options={fields.report_type.options}  />
      </FormItem>
    </div>
        </Form>
        <div className="right-block">
          <Button onClick={this.handleEnsure}>搜索</Button>
        </div>
      </Box>
    )
  }
}