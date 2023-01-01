import { Modal } from '@nextui-org/react'
import React from 'react'

const ModalTemplate = ({visible, setVisible, header, body, footer}) => {
  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <Modal
      closeButton
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        {header()}
      </Modal.Header>
      <Modal.Body>
        {body()}
      </Modal.Body>
      <Modal.Footer>
        {footer()}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalTemplate