import React from "react";
import "./Modal.css"

function Modal(props) {

  function closeModal() {
    props.closeModal();
  }

  return (
    <div class="Modal" onClick={closeModal}>
        <div class="modalBody" onClick={(e) => e.stopPropagation()}>
          <button class="modalCloseBtn" onClick={closeModal}>
            ✖
          </button>
          {props.children}
        </div>
    </div>
  );
}

export default Modal;