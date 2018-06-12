import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import cssmodules from "react-css-modules"

import { Modal, Loading, Box, Form } from '@common/lib'
import Item from '@common/Item'

import styles from "./index.cssmodule.styl"

const FormItem = Form.Item

@cssmodules(styles)
export default class {{upper name}}Modal extends PureComponent {
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
      {{{fieldObject fields}}}
    }
  }
  render() {
    const { data, handleCancel } = this.props
    const { loading, data: itemData = {}, showModal } = data
    const fields = this.initFields(itemData)
    return (
      <Modal isOpen={showModal} title="{{title}}"
        handleEnsure={this.handleEnsure}
        handleCancel={handleCancel}
        contentLabel="{{name}}Modal">
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
            {{{field fields}}}
          </Form>
        </div>
      </Modal>
    )
  }
}
