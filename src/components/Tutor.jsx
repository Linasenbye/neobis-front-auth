import React from 'react';
import lorby from '../images/Image.svg'

const Tutor = () => {
    return (
            <div className='left-side'>
                <img src={lorby} alt='image'/>
                <h1>Lorby</h1>
                <p className='m-plus-1p-regular'>Твой личный репетитор</p>
        </div>
    );
};

export default Tutor;