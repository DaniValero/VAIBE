import React, { useState } from 'react'
import user from "../services/userService";
import AuthConsumer from "../hooks/useAuth";
import { Link, useNavigate } from 'react-router-dom'

import "../styles/login_styles.css"


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [, dispatch] = AuthConsumer();
    const navigate = useNavigate()

    const auth = AuthConsumer()

    let account = {
        email: email,
        password: password
    }

    const handleForm = async (e) => {
        e.preventDefault()
        const { isAdmin } = await user.login(account);

        dispatch({ type: isAdmin ? "admin" : "login" });
        navigate("/home");
    }

    return (

        auth.isAuth ? navigate('/home') :
            <>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
                <div className='loginWrapper'>
                    <h1 className='login-title'>Log in into your account</h1>

                    {/* <form className='inputbox loginForm'> */}
                    <form className='loginInputs'>
                        <div className="inputbox emailInput">
                            <span>Email</span>
                            <input className='emailInput' autoComplete='true' type="email" id="email" name="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                        </div>

                        <div className="inputbox passInput">
                            <span>Password</span>
                            <input className='passInput' autoComplete='true' type="password" id="password" name="password" onChange={(e) => setPassword(e.currentTarget.value)} />
                        </div>

                        <div className='btnCont'>
                            <button type="submit" id="buttonRegister" className='sendButton' onClick={(e) => handleForm(e)}>
                                LOG IN
                            </button>
                        </div>
                    </form>
                </div>
                <div className='registro-link-wrapper'>
                    <h3>You do not have an account? <Link to={`/signup`} className='registro-link'>Sign up here.</Link></h3>
                </div>

            </>
    )
}


export default Login

