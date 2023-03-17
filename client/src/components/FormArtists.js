import React, { useState, useEffect} from 'react'
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
    const [similarity, setSimilarity] = useState("")
    const [popularity, setPopularity] = useState("")

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
                "text": `Act as an API music recommender. I will provide you with artist or bands and you will recommend 3 artist that are ${similarity} all the artist I give you and ${popularity}. Avoid artists that have same name as the ones I give you. Reply JSON format with the main property named recommendations. My first request is ${grupo1} and ${grupo2}.`

                }),
            })
            .then((response) => response.json())
            .then((data) => {
                setSearching(false)
                console.log('Success:', data);
                setRecomendacion1(data.recommendations[0])
                setRecomendacion2(data.recommendations[1])
                setRecomendacion3(data.recommendations[2])
            })
            .catch((error) => {
                console.error('Error:', error);
            })     
        }
    }

    const handleRecommendation = async (e) => {

        await axios.put(`http://localhost:3000/user/add-recommendation/${user.getCurrentUser().email}`,
        {
            grupo1: grupo1,
            grupo2: grupo2,
            recomendacion1: recomendacion1,
            recomendacion2: recomendacion2,
            recomendacion3: recomendacion3,
            opinion: e.currentTarget.value
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })

        window.location.reload()
    }

    const handleRange = (e, event) =>{

        e >= 0 && e < 12 && setSimilarity("different from")
        e >= 12 && e < 36 && setSimilarity("somewhat similar to")
        e >= 36 && e < 62 && setSimilarity("fairly similar to")
        e >= 62 && e < 87 && setSimilarity("very similar to")
        e >= 87 && e <= 100 && setSimilarity("mostly similar to")

        event >= 0 && event < 15 && setPopularity("not popular at all")
        event >= 15 && event < 48 && setPopularity("somewhat popular")
        event >= 48 && event < 78 && setPopularity("quite popular")
        event >= 78 && event <= 100 && setPopularity("mainstream")
    }
<<<<<<< HEAD

=======
    
>>>>>>> 2f4c5f4b6b90191adc8dc4ba358e4e0dc7dc9fcb
    return (
        <>
            <div className='login-wrapper'>
                <h1 className='rec-title'>Type two bands or artists:</h1>

                <form className='recForm'>
                    <div className='inputArtist'>
                        <input type="text" name="text" className="input" placeholder="Artist/Band 1" onChange={(e) => setGrupo1(e.currentTarget.value)}></input>

                        <input type="text" name="text" className="input" placeholder="Artist/Band 2" onChange={(e) => setGrupo2(e.currentTarget.value)}></input>
                    </div>
                    
                    <p>Similarity</p>
                    <input type="range" name="similarityInput" min="0" max="100" onChange={(e) => handleRange(e.currentTarget.value)}/>

                    <p>Popularity</p>
                    <input type="range" name="similarityInput" min="0" max="100" onChange={(event) => handleRange(event.currentTarget.value)}/>

                    <button className='mixUpBtn' onClick={(e) => handleForm(e)}>
                        <span className="TxtEffect">Mix up</span>
                    </button>
                </form>
            </div >

            {
            searching === true && <Spinner loadingText='Let the AI think about it ...' />
            }

<<<<<<< HEAD
           
            {recomendacion3 !== "" && recomendacion2 !== "" && recomendacion1 !== "" && <SpotifyArtist artist={recomendacion1} artist2={recomendacion2} artist3={recomendacion3} />}

         

=======
            {recomendacion3 !== "" && <SpotifyArtist artist={recomendacion1} artist2={recomendacion2} artist3={recomendacion3} />}
    
>>>>>>> 2f4c5f4b6b90191adc8dc4ba358e4e0dc7dc9fcb
            {
                recomendacion3 && <div className="likeordislike">
                    <button className="like btnLike" onClick={(e) => handleRecommendation(e)} value="true">
                        <svg height="24" width="24" xmlns={"../assets/check.svg"} viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                    </button>
                    <button className="dislike btnLike" onClick={(e) => window.location.reload(e)} value="false">
                        <svg height="24" width="24" xmlns={"../assets/wrong.svg"} viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" /></svg>
                    </button>
                </div>
            }

        </>
    );
}

export default SignUp;