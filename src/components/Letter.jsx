import React from 'react';
import Tutor from './Tutor';
import { Link } from 'react-router-dom';

const Letter = () => {
    return (
        <section className='success-page'>
            <Tutor/>
            <form className = "right-side" >
                <label>
                    <p>Выслали письмо со ссылкой для завершения регистрации на example@gmail.com</p>
                    <p>Если письмо не пришло, не спеши ждать совиную почту - лучше проверь ящик “Спам” </p>
                    <p>(´｡• ω •｡`)</p>
                </label>
                
                
                <Link to={`/registration`} style={{ textDecoration: 'none', color: 'black' }} >
                    <p className='register'>Письмо не пришло</p>
                </Link>
            </form>
        </section>
    );
};

export default Letter;