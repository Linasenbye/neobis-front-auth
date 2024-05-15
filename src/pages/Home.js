import lorby from '../images/Image.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalComponent from '../components/Modal';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <section className="home">
      <h1 className='home-title'>Добро пожаловать!</h1>
      <p className='home-text'>Lorby - твой личный репетитор</p>
      <img src={lorby} alt="Lorby"/>
      <button className="logout-btn" onClick={onOpenModal}>Выйти</button>
      <ModalComponent open={open} onClose={onCloseModal}>
        <div className="modal">
          <h3 className='question'>Выйти?</h3>
          <p className='home-modal-text'>Точно выйти?</p>
          <button
            className={activeButton === "logout" ? "login-btn" : "logout-btn"}
            onClick={handleLogout}
            onMouseEnter={() => setActiveButton("logout")}
          >
            Да, точно
          </button>
          <button
            className={activeButton === "stay" ? "login-btn" : "logout-btn"}
            onClick={onCloseModal}
            onMouseEnter={() => setActiveButton("stay")}
          >
            Нет, остаться
          </button>
        </div>
      </ModalComponent>
    </section>
  );
};

export default Home;
