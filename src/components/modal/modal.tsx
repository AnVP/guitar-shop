import {ESC_KEY_CODE} from '../../const';
import {useEffect, ReactNode} from 'react';
import {RemoveScroll} from 'react-remove-scroll';

type ModalProps = {
  children: ReactNode;
  closeModal: () => void;
  selector?: string;
}

function Modal({children, closeModal, selector}: ModalProps): JSX.Element {
  useEffect(() => {
    document.addEventListener('keydown', handleCloseModalOnEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseModalOnEsc);
    };
  }, []);

  const handleCloseModalOnEsc = (evt: KeyboardEvent) => {
    if(evt.key === ESC_KEY_CODE) {
      closeModal();
    }
  };

  return (
    <RemoveScroll>
      <div className={`modal is-active ${selector ? selector : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={closeModal}></div>
          <div className="modal__content">
            {children}
            <button
              onClick={closeModal}
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
}

export default Modal;
