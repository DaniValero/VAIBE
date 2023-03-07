import React, { useState } from 'react'
import user from "../services/userService";
import AuthConsumer from "../hooks/useAuth";
import { Link, useNavigate } from 'react-router-dom'

import "../styles/login.css"


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
        // console.log(account) Lo comento por seguridad, No tiene sentido publicar los datos de la cuenta por consola.

        const { isAdmin } = await user.login(account);

        dispatch({ type: isAdmin ? "admin" : "login" });
        navigate("/v2");
    }

    return (

        auth.isAuth ? navigate('/home') :
            <>
                <div className='login-wrapper'>
                    <h1 className='login-title'>Log in into your account</h1>

                    {/* <form className='inputbox loginForm'> */}
                    <form className='inputbox'>
                        <div className="inputbox emailInput">
                            <input autoComplete='true' type="email" id="email" name="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                            <span>Email</span>
                            <i></i>
                        </div>

                        <div className="inputbox passInput">
                            <input autoComplete='true' type="password" id="password" name="password" onChange={(e) => setPassword(e.currentTarget.value)} />
                            <span>Password</span>
                            <i></i>
                        </div>

                        <div className='btnCont'>
                            <button type="submit" id="buttonRegister" className='sendButton' onClick={(e) => handleForm(e)}>
                                Login
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

