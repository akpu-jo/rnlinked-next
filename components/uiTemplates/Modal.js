import { Modal } from '@nextui-org/react'
import React from 'react'

const ModalTemplate = ({visible, setVisible, header, body, footer, closeHandler = false}) => {
  const close = () => {
     setVisible(false)
   }

  return (
    <Modal
      closeButton
      open={visible}
      onClose={!closeHandler ? close : closeHandler}
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