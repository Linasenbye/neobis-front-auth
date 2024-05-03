import React from 'react';
import { useForm } from 'react-hook-form'
import lorby from '../images/Image.svg'
import { Link } from 'react-router-dom';

const Registration = () => {
    const {
        register, 
        formState: { errors, touched },
        handleSubmit,
        watch,
    } = useForm({
        mode: "onBlur"
    });

    // Make sure 'password' is properly registered
    const passwordValue = watch("password");

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }
    return (
        <section className='registration-page'>
            <div className='left-side'>
                <img src={lorby} alt='image'/>
                <h1>Lorby</h1>
                <p className='m-plus-1p-regular'>Твой личный репетитор</p>
            </div>
            <form className = "right-side" onSubmit={handleSubmit(onSubmit)}>
                <h1>Создать аккаунт Lorby</h1>
                <label>
                    <input type="email" placeholder='Введи адрес почты' {...register('email')}/>
                    <input type="text" placeholder='Придумай логин' {...register('firstName')}/>
                    <input type="text" placeholder='Создай пароль' {...register('password', {
                        required: 'Пароль обязателен для заполнения',
                        minLength: {
                            value: 8,
                            message: 'От 8 до 15 символов',
                        },
                        maxLength: {
                            value: 15,
                            message: 'От 8 до 15 символов',
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[!@#$%^&*])[\dA-Za-zА-Яа-я!@#$%^&*]{8,15}$/,
                            message: 'Пароль должен содержать строчные и прописные буквы, минимум одну цифру и один спецсимвол (!, ", #, $...)',
                        },
                    })} />
                    <ul className='required'>
                        <li>'От 8 до 15 символов'</li>
                        <li>'Строчные и прописные буквы'</li>
                        <li>'Минимум 1 цифра'</li>
                        <li>'Минимум 1 спецсимвол (!, ", #, $...)'</li>
                    </ul>
                </label>
                
                <div>
                    {errors?.firstName && errors?.password && <p>{errors?.firstName?.message || "Error!"}</p>}
                </div>
                <input type="text" placeholder='Повтори пароль' {...register('passwordRepeat', { required: "Пароли не совпадают", })} />
                <input type="submit" value="Далее"/>
                <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
                    <p className='back'>Назад</p>
                </Link>
            </form>
        </section>
    );
};

export default Registration;
