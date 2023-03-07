import React, { useState } from 'react'
import { toast } from 'react-toastify'
import user from "../services/userService"
import axios from 'axios'

import "../styles/profile.css"

const EditUserForm = () => {
    const [newUsername, setNewUsername] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const users = user.getCurrentUser().data
    const users2 = user.getCurrentUser().data2
    const username = user.getCurrentUser()

    const handleForm = async (e) => {
        e.preventDefault()

        newPassword === "" && toast.warning("Password is required")
        newPassword !== newPassword2 && toast.warning("Passwords must match!")

        newUsername === "" && setNewUsername(user.getCurrentUser().username)
        newEmail === "" && setNewEmail(user.getCurrentUser().email)

        fetch(`http://localhost:3000/user/edit/${user.getCurrentUser().email}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUsername,
                    email: newEmail
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data) && toast.info("Account information updated successfully")
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    return (
        <>
            <div>

            { (!username.data.length && !username.data2.length) 
             ? <h1 className='tituloSaludo'>Hey, {username.username}, No recent recommendations...</h1>
             : <h1 className='tituloSaludo'>Hey, {username.username}, these are your recent recommendations:</h1>                         
            }
                <div className='ContainerProfile'>
                {users2.reverse().map((e) => (
                        <div className='cardProfile'>
                            <h3 className='details-card'>Details:</h3>
                            <h4>Text: {e.text}</h4>
                            <h4>Age: {e.ages}</h4>
                            <h4>Music genre: {e.music}</h4>
                            <h4>Hobbie: {e.hobbie}</h4>
                            <h4>Language: {e.language}</h4>

                            <h3 className='recommendations-card'>Recommendations:</h3>
                            {e.opcion1 === "true"? <h4 className='option-selected'> 1: {e.recomendacion1}</h4> : <h4> 1: {e.recomendacion1}</h4>}
                            {e.opcion2 === "true"? <h4 className='option-selected'> 2: {e.recomendacion2}</h4> : <h4> 2: {e.recomendacion1}</h4>}
                            {e.opcion3 === "true"? <h4 className='option-selected'> 3: {e.recomendacion3}</h4> : <h4> 3: {e.recomendacion1}</h4>}
                        </div>
                    ))}

                    {users.reverse().map((e) => (
                        <div className='cardProfile'>
                            <h3 className='details-card'>Artist/Bands</h3>
                            <h4>1: {e.grupo1}</h4>
                            <h4>2: {e.grupo2}</h4>
                            <h3 className='recommendations-card'>Recommendations:</h3>
                            <h4> 1: {e.recomendacion1}</h4>
                            <h4> 2: {e.recomendacion2}</h4>
                            <h4> 3: {e.recomendacion3}</h4>
                        </div>
                    ))}
                </div>

            </div>
            <div className='login-wrapper'>
                <h2 className='login-title'>Edit your information:</h2>
                <form className='inputbox loginForm'>
                    <div className="inputbox">
                        <input autoComplete='true' type="text" id="username" name="username" onChange={(e) => setNewUsername(e.currentTarget.value)} />
                        <span className='input-title'>Username</span>
                        <i></i>
                    </div>

                    <div className="inputbox">
                        <input autoComplete='true' type="email" id="email" name="email" onChange={(e) => setNewEmail(e.currentTarget.value)} />
                        <span className='input-title'>Email</span>
                        <i></i>
                    </div>

                    <div className="inputbox">
                        <input autoComplete='true' type="password" id="password" name="password" onChange={(e) => setNewPassword(e.currentTarget.value)} />
                        <span className='input-title'>Password</span>
                        <i></i>
                    </div>

                    <div className="inputbox">
                        <input autoComplete='true' type="password" id="password2" name="password" onChange={(e) => setNewPassword2(e.currentTarget.value)} />
                        <span className='input-title'>Repeat password</span>
                        <i></i>
                    </div>

                    <button type="submit" id='btnEdit' onClick={(e) => handleForm(e)}>
                        Edit user
                    </button>
                </form>

            </div>

        </>
    );
};

export default EditUserForm;