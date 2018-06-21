import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import cssmodules from "react-css-modules"

import { Modal, Loading, Box, Form, Alert, LabelSelect, Select, MultiInput, Input } from '@common/lib'
import Item from '@common/Item'

import styles from "./index.cssmodule.styl"

const FormItem = Form.Item

@cssmodules(styles)
export default class ReportEditModal extends PureComponent {
  handleEnsure = () => {
    const {handleEnsure, data} = this.props
    const {item, action} = data
    const ret = this.input.validateAndSubmit()
    if (ret) {
      handleEnsure(ret, item, action)
    }
  }
  initFields(data) {
    return {
      severity: {
        value: data.severity || '',
        options: []
      },
      intel_type: {
        value: data.intel_type || '',
        options: []
      },
      main_tag: {
        value: data.main_tag || '',
        options: []
      },
      machine: {
        value: data.machine || []
      },
      behave_source: {
        value: data.behave_source || ''
      },
      name: {
        value: data.name || ''
      }
    }
  }
  render() {
    const {data, handleCancel} = this.props
    const {loading, data: itemData = {}, showModal} = data
    const fields = this.initFields(itemData)
    return (
      <Modal isOpen={ showModal }
        title="编辑报告"
        handleEnsure={ this.handleEnsure }
        handleCancel={ handleCancel }
        contentLabel="reportEditModal">
        <Item show={ Boolean(error) }>
          <Alert message="提交失败"
            className="mgb20"
            type="error"
            description={ String(error) } />
        </Item>
        <Item show={ loading }>
          <div className="loading-wrap">
            <Loading type="box">
              正在提交中...
            </Loading>
          </div>
        </Item>
        <div className="content-wrap">
          <Form data={ fields } ref={ form => (this.form = form) }>
            <div className="row">
              <FormItem label="严重程度" field="severity">
                <LabelSelect options={ fields.severity.options } />
              </FormItem>
            </div>
            <div className="row">
              <FormItem label="威胁类型" field="intel_type">
                <LabelSelect options={ fields.intel_type.options } />
              </FormItem>
            </div>
            <div className="row">
              <FormItem label="威胁标签" field="main_tag">
                <Select options={ fields.main_tag.options } />
              </FormItem>
            </div>
            <div className="row">
              <FormItem label="告警主机"
                field="machine"
                placeholder="IP地址或主机名称，可输入多个">
                <MultiInput />
              </FormItem>
            </div>
            <div className="row">
              <FormItem label="数据源" field="behave_source">
                <Select options={ fields.behave_source.options } />
              </FormItem>
            </div>
            <div className="row">
              <FormItem label="标题名称输入"
                field="name"
                placeholder="该名称将作为报告标题">
                <Input />
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
    )
  }
}
