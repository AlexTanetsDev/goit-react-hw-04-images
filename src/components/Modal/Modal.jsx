import { ModalContainer, Overlay } from "./Modal.styled"
import { createPortal } from "react-dom"
import { useEffect } from "react"
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({image, onClose})=> {

    useEffect(() => {
       window.addEventListener('keydown', hendleKeydown)
    
      return () => {
          window.removeEventListener('keydown', hendleKeydown)
      }
    }, [])
    

   const hendleKeydown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

       
        return (
        createPortal(
            <Overlay>
              <ModalContainer>
                <img src={image} alt='' />
              </ModalContainer>
            </Overlay>, modalRoot)
    )
}


Modal.propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}