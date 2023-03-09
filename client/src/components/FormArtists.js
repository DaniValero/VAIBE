import React, { useState } from 'react'
import { toast } from "react-toastify"
import SpotifyArtist from './SpotifyArtist'
import "../assets/wrong.svg"
import "../assets/check.svg"
import user from "../services/userService"
import Spinner from "../components/Spinner"
import axios from 'axios'

import "../styles/home.css"

const SignUp = () => {
    const [grupo1, setGrupo1] = useState("")
    const [grupo2, setGrupo2] = useState("")
    const [searching, setSearching] = useState(false)
    const [recomendacion1, setRecomendacion1] = useState("")
    const [recomendacion2, setRecomendacion2] = useState("")
    const [recomendacion3, setRecomendacion3] = useState("")

    const handleForm = async (e) => {
        e.preventDefault()

        if (grupo1 === "" || grupo2 === "") {
            toast.warning("Both imputs are required")
            return
        }  else {

            setSearching(true)

            await fetch(`http://localhost:3000/recommendv1`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "text": `Act as an API music recommender. I will provide you with artist or bands and you will recommend 3 artist that are very similar to all the artist I give you and not very popular. Avoid artists that have same name as the ones I give you. Reply JSON format with the main property named recommendations. My first request is nas and method man and the language must be English.`
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                setSearching(false)
                console.log('Success:', data);
                setRecomendacion1(data.recommendations[0].artist)
                setRecomendacion2(data.recommendations[1].artist)
                setRecomendacion3(data.recommendations[2].artist)
                console.log(recomendacion1)
            })
            .catch((error) => {
                console.error('Error:', error);
            })     
        }
    }

    // const handleRecommendation = async (e) => {

    //     axios.put(`http://localhost:3000/user/add-recommendation/${user.getCurrentUser().email}`,
    //     {
    //         grupo1: grupo1,
    //         grupo2: grupo2,
    //         recomendacion1: recomendacion1,
    //         recomendacion2: recomendacion2,
    //         recomendacion3: recomendacion3,
    //         opinion: e.currentTarget.value
    //     })
    //     .then((data) => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     })

    //     fetch(`http://musicrec-env.eba-tvtntc4p.us-east-1.elasticbeanstalk.com/bbdd`,

    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 _id: user.getCurrentUser()._id,
    //                 username: user.getCurrentUser().username,
    //                 email: user.getCurrentUser().email,
    //                 sexo: user.getCurrentUser().gender,
    //                 ocupacion: user.getCurrentUser().occupation,
    //                 data: user.getCurrentUser().data[user.getCurrentUser().data.length]
    //             }),
    //         })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Success:', data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         })
    //     window.location.reload()
    // }

    return (
        <>
            <div className='login-wrapper'>
                <h1 className='rec-title'>Type two bands or artists:</h1>

                <form className='recForm'>
                    <div className='inputArtist'>
                        <input type="text" name="text" className="input" placeholder="Artist/Band 1" onChange={(e) => setGrupo1(e.currentTarget.value)}></input>

                        <input type="text" name="text" className="input" placeholder="Artist/Band 2" onChange={(e) => setGrupo2(e.currentTarget.value)}></input>
                    </div>

                    <button className='mixUpBtn' onClick={(e) => handleForm(e)}>
                        <span className="TxtEffect">Mix up</span>
                    </button>
                </form>
            </div >

            {
            searching === true && <Spinner loadingText='Let the AI think about it ...' />
            }

           
            {
                recomendacion3 !== "" && <SpotifyArtist artist={recomendacion1} artist2={recomendacion2} artist3={recomendacion3} />
            }

         
{/* 
            {
                recomendacion3 && <div className="likeordislike">
                    <button className="like btnLike" onClick={(e) => handleRecommendation(e)} value="true">
                        <svg height="24" width="24" xmlns={"../assets/check.svg"} viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                    </button>
                    <button className="dislike btnLike" onClick={(e) => handleRecommendation(e)} value="false">
                        <svg height="24" width="24" xmlns={"../assets/wrong.svg"} viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" /></svg>
                    </button>
                </div>
            } */}

        </>
    );
}

export default SignUp;