import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import cssmodules from "react-css-modules"

import { Modal, Loading, Box, Form,Input, Select } from '@common/lib'
import Item from '@common/Item'

import styles from "./index.cssmodule.styl"

const FormItem = Form.Item

@cssmodules(styles)
export default class HostDataEditModal extends PureComponent {
  handleEnsure = () => {
    const { handleEnsure, data } = this.props
    const { item, action } = data
    const ret = this.input.validateAndSubmit()
    if (ret) {
      handleEnsure(ret, item, action)
    }
  }
  initFields (data) {
    return {
      name: {
        value: field.name || '',
        validators: [{required:true}],
      },
city: {
        value: field.city || '',
options: [{label:111,value:1},{label:222,value:2}]
      }
    }
  }
  render() {
    const { data, handleCancel } = this.props
    const { loading, data: itemData = {}, showModal } = data
    const fields = this.initFields(itemData)
    return (
      <Modal isOpen={showModal} title="编辑型modal"
        handleEnsure={this.handleEnsure}
        handleCancel={handleCancel}
        contentLabel="hostDataEditModal">
        <Item show={Boolean(error)}>
          <Alert message="提交失败" className="mgb20" type="error" description={String(error)} />
        </Item>
        <Item show={loading}>
          <div className="loading-wrap">
            <Loading type="box">
              正在提交中...
            </Loading>
          </div>
        </Item>
        <div className="content-wrap">
          <Form data={fields} ref={input => (this.input = input)}>
            <div className="row">
      <FormItem label="姓名" field="name" placeholder="测试">
        <Input />
      </FormItem>
    </div>
<div className="row">
      <FormItem label="城市" field="city">
        <Select options={fields.city.options} />
      </FormItem>
    </div>
          </Form>
        </div>
      </Modal>
    )
  }
}
