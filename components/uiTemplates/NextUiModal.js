import { Modal } from "@nextui-org/react";
import React from "react";

const NextUiModal = ({ mHeader, mBody, mFooter, children, mOptions }) => {
  return (
    <Modal
    >
      <Modal.Header>{mHeader}</Modal.Header>
      <Modal.Body>{mBody}</Modal.Body>
      <Modal.Footer>{mFooter}</Modal.Footer>
    </Modal>
  );
};

export default NextUiModal;
