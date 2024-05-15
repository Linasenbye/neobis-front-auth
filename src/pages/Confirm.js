import Tutor from '../components/Tutor';
import { Link } from "react-router-dom";


import ModalComponent from "../components/Modal"
import { useState } from "react";
import { useSelector } from "react-redux";
import arrow from "../images/arrow.svg"



const Confirmation = () => {
  const [open, setOpen] = useState(false);

  const email = useSelector(state => state.auth.email);
  
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <section className="confirm">
        
        <Tutor/>

        <div className="confirm-wrapper">
        <Link to="/" className="link">
            <button className="return-btn">
              <img className="arrow" src={arrow} alt="arrow go back" />
              Назад
            </button>
          </Link>
          <div className="confirm-text">
            <h2>Выслали письмо со ссылкой для завершения регистрации на {email}</h2>
            <p className='grey-text'>Если письмо не пришло, не спеши ждать совиную почту - лучше <span>проверь ящик “Спам”</span></p>
            <h3>(´｡• ω •｡`)</h3>
            <button onClick={onOpenModal} className="resend">Письмо не пришло</button>
            <ModalComponent open={open} onClose={onCloseModal}>
              <div className='modal' >
                <h3 className="modal-email">Мы выслали еще одно письмо на указанную тобой почту {email}</h3>
                <p className='modal-text'>Не забудь проверить ящик “Спам”</p>
                <button className="ok-btn"onClick={onCloseModal}>Понятно</button>
              </div>
            </ModalComponent>
          </div>
        </div>
    </section>
  )
}

export default Confirmation