import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Tutor from '../components/Tutor';
import Letter from '../components/Letter';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/;

const REGISTER_URL = "/register"

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
            try {
                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({ email, username : user,password : pwd, confirmPassword : matchPwd }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                console.log(response?.data);
                console.log(response?.accessToken);
                console.log(JSON.stringify(response))
                setSuccess(true);
               
                setEmail('');
                setUser('');
                setPwd('');
                setMatchPwd('');
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed')
                }
                errRef.current.focus();
            }
        }

    return (
        <>
        {success ? (
            <Letter/>
        ) : (
        <section className='registration-page'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Tutor/>
            <form className = "right-side" onSubmit={handleSubmit}>
                <h1>Создать аккаунт Lorby</h1>
                <label>
                    <label htmlFor='email'></label>
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
                    <label htmlFor='username'></label>
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
                    <label htmlFor='password'></label>
                    <input 
                        type="password"
                        placeholder='Создай пароль'
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}/>
                        
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
                    <label htmlFor="confirm_pwd"></label>
                    <input 
                        type="password"
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