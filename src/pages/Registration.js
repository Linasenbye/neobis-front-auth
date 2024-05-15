import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Tutor from '../components/Tutor';
import show from "../images/show.svg"
import hide from "../images/hide.svg"


import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from '../store/auth';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/;



const Registration = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPwd, setShowPwd] = useState(false);
    const [showMatchPwd, setShowMatchPwd] = useState(false);

    const toggleShowPwd = () => {
        setShowPwd(!showPwd);
      };
    
    const toggleShowMatchPwd = () => {
        setShowMatchPwd(!showMatchPwd);
      };

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd == matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, user, pwd, matchPwd])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ email, username : user,password : pwd, confirmPassword : matchPwd })).then(() => {
          setSuccess(true); 
        }).catch((error) => {
            setErrMsg(error.message); 
            setSuccess(false);
        });
    };

    return (
        <>
        {success ? (
            navigate('/confirm')
        ) : (
        <section className='registration-page'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Tutor/>
            <form className = "right-side" onSubmit={handleSubmit}>
                <h1>Создать аккаунт Lorby</h1>
                <label>
                    <label htmlFor='email'>
                    <input 
                        type="email" 
                        id="email"
                        placeholder='Введи адрес почты'
                        ref = {userRef}
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <ul id='required'>
                            <li>4 to 24 characters.</li>
                            <li>Must begin with a letter.</li>
                            <li>Letters, numbers, underscores, hyphens allowed.</li>
                        </ul>
                    </p>
                    </label>
                    <label htmlFor='username'>
                    <input 
                        type="text" 
                        id="username"
                        ref = {userRef}
                        autoComplete='off'
                        placeholder='Придумай логин' 
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <ul id='required'>
                            <li>4 to 24 characters.</li>
                            <li>Must begin with a letter.</li>
                            <li>Letters, numbers, underscores, hyphens allowed.</li>
                        </ul>
                    </p>
                    </label>
                    <label htmlFor='password' className='pwd-input'>
                    <input 
                        type={showPwd ? 'text' : 'password'}
                        placeholder='Создай пароль'
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}/>
                    <button className="icon" onClick={toggleShowPwd} type="button">
                        <img src={showPwd ? hide : show}/>
                    </button>
                    </label>
                        
                    <ul id='required'>
                        <li className={pwd.length >= 8 && pwd.length <= 15 ? 'valid' : 'invalid'}>
                            {'От 8 до 15 символов '}
                            {pwd.length >= 8 && pwd.length <= 15 ? '✅' : '❌'}
                        </li>
                        <li className={/[a-z]/.test(pwd) && /[A-Z]/.test(pwd) ? 'valid' : 'invalid'}>
                            {'Строчные и прописные буквы '}
                            {/[a-z]/.test(pwd) && /[A-Z]/.test(pwd) ? '✅' : '❌'}
                        </li>
                        <li className={/\d/.test(pwd) ? 'valid' : 'invalid'}>
                            {'Минимум 1 цифра '}
                            {/\d/.test(pwd) ? '✅' : '❌'}
                        </li>
                        <li className={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(pwd) ? 'valid' : 'invalid'}>
                            {'Минимум 1 спецсимвол (!, ", #, $...)' }
                            {/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(pwd) ? '✅' : '❌'}
                        </li>
                    </ul>
                    <label htmlFor="confirm_pwd" className='pwd-input'>
                    <input 
                        type={showMatchPwd ? 'text' : 'password'}
                        placeholder='Повтори пароль' 
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        />
                    <button className="icon" onClick={toggleShowMatchPwd} type="button">
                        <img src={showMatchPwd ? hide : show}/>
                    </button>
                    </label>
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Пароли не совпадают
                    </p>
                    </label>
        
                

                <input type="submit" value="Далее" disabled={!validName || !validPwd || !validMatch ? true : false}/>
                
                <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
                    <p className='back'>Назад</p>
                </Link>
            </form>
        </section>
    )};
</>
    )
        }



export default Registration;