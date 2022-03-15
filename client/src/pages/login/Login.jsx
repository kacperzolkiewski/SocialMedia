import { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/UserContext'
import { CircularProgress } from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default function Login() {
    // We can use hear useState, but with useRef our page is not rerender all
    // the time when password, email change
    const password = useRef()
    const email = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        )
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h2 className="loginLogo">Social Media</h2>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Social Media
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Email' type='email' required ref={email} className="loginInput" />
                        <input placeholder='Password' type='password' required ref={password} minLength="5" className="loginInput" />
                        <button className="loginButton" type='submit' disabled={isFetching}>
                            {isFetching
                                ? <CircularProgress size='30px' sx={{ color: 'white' }} />
                                : "Log In"
                            }
                        </button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton" onClick={() => {navigate('/register')}} disabled={isFetching}>
                            {isFetching
                                ? <CircularProgress size='30px' sx={{ color: 'white' }} />
                                : "Create New Account"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
