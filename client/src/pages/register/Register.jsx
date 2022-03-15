import { useRef } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import './register.css'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        if (password.current.value !== passwordAgain.current.value) {
            password.current.setCustomValidity("Passwords don't match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }

            try {
                await axios.post('/auth/register', user)
                navigate('/login')
            } catch (err) {
                console.log(err)
            }
        }
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
                        <input placeholder='Username' ref={username} required className="loginInput" />
                        <input placeholder='Email' ref={email} type='email' required className="loginInput" />
                        <input placeholder='Password' ref={password} type='password' required minLength='5' className="loginInput" />
                        <input placeholder='Password Again' ref={passwordAgain} type='password' required className="loginInput" />
                        <button className="loginButton" type='submit'>Sign Up</button>
                        <button className="loginRegisterButton" onClick={() => { navigate('/login') }}>Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
