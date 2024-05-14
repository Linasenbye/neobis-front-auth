import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

import { Link } from 'react-router-dom';
import Tutor from '../components/Tutor';
import Welcome from '../components/Welcome';

import axios from '../api/axios';

const LOGIN_URL = '/auth'; 


const Home = () => {


    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email : user, password : pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    
    

    return (
        <>
            {success ? (
                <section>
                    <Welcome/>
                </section>
            ) : (
        <section className='login-page'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Tutor/>
            <form className = "right-side" onSubmit={handleSubmit}>
                <h1>Вэлком бэк!</h1>
                <label>
                    <label htmlFor="username"></label>
                        <input
                            type="text"
                            placeholder='Введи туда-сюда логин'
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    <label htmlFor="password"></label>
                        <input
                            type="password"
                            placeholder='Пароль (тоже введи)'
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        /> 
                </label>
    
                <input className="submit" type="submit" value="Войти"/>
                <Link to={`/registration`} style={{ textDecoration: 'none', color: 'black' }} >
                    <p className='register'>У меня еще нет аккаунта</p>
                </Link>
            </form>
        </section>
            )};
            </>
    );
};

export default Home;