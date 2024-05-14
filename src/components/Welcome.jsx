import React from 'react';
import lorby from '../images/Image.svg'

const Welcome = () => {
    return (
            <div className='welcome'>
                <h1>С возвращением!</h1>
                <h2>Lorby - твой личный репетитор</h2>
                <img src={lorby} alt='image'/>
                
                <button>Выйти</button>
        </div>
    );
};

export default Welcome;