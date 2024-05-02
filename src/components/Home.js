import React from 'react';
import {useForm} from 'react-hook-form'
import lorby from '../images/Image.svg'

const Home = () => {
    const {
        register, 
        formState: {
            errors, 
        }, 
        handleSubmit,

    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <section className='login-page'>
            <div className='left-side'>
                <img src={lorby} alt='image'/>
                <h1>Lorby</h1>
                <p className='m-plus-1p-regular'>Твой личный репетитор</p>
            </div>
            <form className = "right-side" onSubmit={handleSubmit(onSubmit)}>
                <h1>Вэлком бэк!</h1>
                <label>
                    <input type="text" placeholder='Введи туда-сюда логин' {...register('firstName', {required: "Неверный логин или пароль",})}/>
                    <input type="text" placeholder='Пароль (тоже введи)' {...register('password', {required: "Неверный логин или пароль",})}/>
                </label>
                <div>
                    {errors?.firstName && errors?.password && <p>{errors?.firstName?.message || "Error!"}</p>}
                </div>
                <input type="submit" value="Войти"/>
                <p className='register'>У меня еще нет аккаунта</p>
            </form>
        </section>
    );
};

export default Home;