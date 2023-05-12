import React, { useEffect, useState } from 'react'
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
    const [profile, setProfile] = useState({})


    useEffect(() => {

        const getBusquedas = async () => {
        await axios.get(`http://localhost:3000/user/get/${user.getCurrentUser().email}`)
          .then((response) => setProfile(response.data))
          .catch((error) => {
              console.error('Error:', error);
          })
        }
        getBusquedas()
        
    }, [])

    return (
        <>
            <div>

            { (!username.data.length && !username.data2.length) 
             ? <h1 className='tituloSaludo'>Hello, {username.username}, there are no recent recommendations...</h1>
             : <h1 className='tituloSaludo'>Hello, {username.username}, these are your recent recommendations:</h1>                         
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

                    {profile.data? profile.data.reverse().map((e) => (
                        <div className='cardProfile'>
                            <h3 className='details-card'>Artist/Bands</h3>
                            <h4>1: {e.grupo1}</h4>
                            <h4>2: {e.grupo2}</h4>
                            <h3 className='recommendations-card'>Recommendations:</h3>
                            <h4> 1: {e.recomendacion1}</h4>
                            <h4> 2: {e.recomendacion2}</h4>
                            <h4> 3: {e.recomendacion3}</h4>
                        </div>
                    )) : "Loading..."}
                </div>

            </div>

        </>
    );
};

export default EditUserForm;