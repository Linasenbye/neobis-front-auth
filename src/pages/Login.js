import { useRef, useState, useEffect, useContext } from 'react';
import { login } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Tutor from '../components/Tutor';



const Home = () => {


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (values) => {

        const { user, pwd } = values;
      
        try {
          const response = await dispatch(login({ user, pwd }));
          console.log(response);
          
          if (response.payload) {
            setUser('');
            setPwd('');
            setSuccess(true);
            
          } else {
            console.log('Invalid username or password');
          }
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
                navigate('home')
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