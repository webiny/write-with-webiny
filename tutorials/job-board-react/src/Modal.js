function Modal({open, modalLable, children, custom_modal, onClose, customBlackDrop}) {

  if(open) {
    return (
      <div className={`modalContainer ${customBlackDrop}`}>
        <div className= {`modal ${custom_modal}`}>
          <div className='modal__head'>
            <h2>{modalLable}</h2>
            <span className='modal__close' onClick={onClose}>x</span>
          </div>
          {children}
        </div>
      </div>
    )
  }
  return null
}

export default Modal