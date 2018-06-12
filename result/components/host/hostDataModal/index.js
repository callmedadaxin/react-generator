import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import autobind from "autobind-decorator";
import cssmodules from "react-css-modules";

import { Modal, Loading, Box, Button } from '@common/lib'
import Item from '@common/Item'

import styles from "./index.cssmodule.styl";

@cssmodules(styles)
export default class HostDataModal extends PureComponent {
  renderFooter() {
    return <Button type="primary" className="mgr20" width="90" onClick={this.props.handleCancel}>确定</Button>;
  }
  render() {
    const { data, handleCancel } = this.props;
    const { loading, data: itemData = {}, showModal } = data;
    return (
      <Modal
        isOpen={showModal}
        title="展示型modal"
        handleEnsure={handleCancel}
        handleCancel={handleCancel}
        footer={this.renderFooter()}
        contentLabel="hostDataModal"
      >
        <Box isLoading={loading} data={itemData}>
          {
            JSON.stringify(itemData)
          }
        </Box>
      </Modal>
    );
  }
}
