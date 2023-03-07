import React, { useState } from 'react'
import Spotify from "react-spotify-embed";
import "../styles/home.css"
import "../styles/login.css"
import "../styles/home_v2.css"
import user from "../services/userService"
import axios from 'axios';
import { toast } from 'react-toastify';


const SignUp = () => {
    const [text, setText] = useState("")
    const [gender, setGender] = useState("")
    const [ages, setAges] = useState("")
    const [musicGenre, setMusicGenre] = useState("")
    const [hobbie, setHobbie] = useState("")
    const [language, setLanguage] = useState("")
    const [opcion1, setOpcion1] = useState("false")
    const [opcion2, setOpcion2] = useState("false")
    const [opcion3, setOpcion3] = useState("false")

    const [recomendacion1, setRecomendacion1] = useState("")
    const [recomendacion2, setRecomendacion2] = useState("")
    const [recomendacion3, setRecomendacion3] = useState("")
    const [uri1, setUri1] = useState("")
    const [uri2, setUri2] = useState("")
    const [uri3, setUri3] = useState("")

    const handleOption = (e) => {
        e === "opcion1" ? setOpcion1("true") && setOpcion2("false") && setOpcion3("false") : setOpcion1("false")
        e === "opcion2" ? setOpcion2("true") && setOpcion1("false") && setOpcion3("false") : setOpcion2("false")
        e === "opcion3" ? setOpcion3("true") && setOpcion1("false") && setOpcion2("false") : setOpcion3("false")
    }

    const handleForm = async (e) => {
        e.preventDefault()

        await axios.post('http://musicrec-env.eba-tvtntc4p.us-east-1.elasticbeanstalk.com/recomendaciones', {
            text: text,
            gender: gender, 
            ages: ages,
            music: musicGenre,
            hobbie: hobbie,
            language: language,
        })
            .then(function (response) {
                setRecomendacion1(response.data.data[0].recomendacion1)
                setRecomendacion2(response.data.data[1].recomendacion2)
                setRecomendacion3(response.data.data[2].recomendacion3)

                setUri1(response.data.data[0].uri)
                setUri2(response.data.data[1].uri)
                setUri3(response.data.data[2].uri)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleRecommendation = async (e) => {

        axios.put(`http://localhost:3000/${user.getCurrentUser().email}`,
            {
                text: text,
                gender: gender,
                ages: ages,
                music: musicGenre,
                hobbie: hobbie,
                language: language,
                recomendacion1: recomendacion1,
                recomendacion2: recomendacion2,
                recomendacion3: recomendacion3,
                opcion1: opcion1,
                opcion2: opcion2,
                opcion3: opcion3
            })
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

        await axios.post(`http://dbmusic.cb2wgp0ktb7z.us-east-1.rds.amazonaws.com/`,
        {
            _id: user.getCurrentUser()._id,
            username: user.getCurrentUser().username,
            email: user.getCurrentUser().email,
            sexo: user.getCurrentUser().gender,
            ocupacion: user.getCurrentUser().occupation,
            text: text,
            gender: gender,
            ages: ages,
            music: musicGenre,
            hobbie: hobbie,
            language: language,
            data: {
                recomendacion1: recomendacion1,
                recomendacion2: recomendacion2,
                recomendacion3: recomendacion3,
                opcion1: opcion1,
                opcion2: opcion2,
                opcion3: opcion3
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <>
            <div className='login-wrapper'>
                <h1 className='rec-title'>Select details for your recommendation:</h1>

                <form className='recForm'>
                    <div className='inputArtist2'>
                        {/* <label>Text:</label> */}
                        <input type="text" name="text" className="input2" placeholder="Type anything you feel like ..." onChange={(e) => setText(e.currentTarget.value)}></input>

                        <div className='select-input box'>
                            {/* <span>Gender:</span> */}
                            <select name="occupation" id="occupation" onChange={(event) => setGender(event.currentTarget.value)}>
                                <option value="null" selected disabled>Select gender:</option>
                                <option name="Male" value="Male">Male</option>
                                <option name="Female" value="Female">Female</option>
                                <option name="Male and Female" value="Male and Female">Male and Female</option>
                            </select>
                        </div>
                        <div className='select-input box'>
                            {/* <span>Age:</span> */}
                            <select name="occupation" id="occupation" onChange={(event) => setAges(event.currentTarget.value)}>
                                <option value="null" selected disabled>Select age:</option>
                                <option name="12" value="12-16">12-16</option>
                                <option name="16-25" value="16-25">16-25</option>
                                <option name="25-35" value="25-35">25-35</option>
                                <option name="35-45" value="35-45">35-45</option>
                                <option name=">45" value=">45">45+</option>
                            </select>
                        </div>
                        <div className='select-input box'>
                            {/* <span>Music Genre:</span> */}
                            <select name="occupation" id="occupation" onChange={(event) => setMusicGenre(event.currentTarget.value)}>
                                <option value="null" selected disabled>Select music genre:</option>
                                <option name="Pop" value="Pop">Pop</option>
                                <option name="Rock or Metal or Punk" value="Rock or Metal or Punk">Rock or Metal or Punk</option>
                                <option name="Hip hop or Rap or R&B or Trap" value="Hip hop or Rap or R&B or Trap">Hip hop or Rap or R&B or Trap</option>
                                <option name="Electronic or Techno or Trance" value="Electronic or Techno or Trance">Electronic or Techno or Trance</option>
                                <option name="Reggaeton" value="Reggaeton">Reggaeton</option>
                                <option name="Salsa or Merengue or Bachata" value="Salsa or Merengue or Bachata">Salsa or Merengue or Bachata</option>
                                <option name="Reggae" value="Reggae">Reggae</option>
                                <option name="Indie" value="Indie">Indie</option>
                                <option name="Flamenco" value="Flamenco">Flamenco</option>
                            </select>
                        </div>
                        <div className='select-input box'>
                            {/* <span>Hobbie:</span> */}
                            <select name="occupation" id="occupation" onChange={(event) => setHobbie(event.currentTarget.value)}>
                                <option value="null" selected disabled>Select a hobbie:</option>
                                <option name="Taking photos and editing them" value="Taking photos and editing them">Taking photos and editing them</option>
                                <option name="Travelling" value="Travelling">Travelling</option>
                                <option name="Exercise and body care" value="Exercise and body care">Exercise and body care</option>
                                <option name="Food and cooking" value="Food and cooking">Food and cooking</option>
                                <option name="Fashion and beauty" value="Fashion and beauty">Fashion and beauty</option>
                                <option name="Animals and pets" value="Animals and pets">Animals and pets</option>
                                <option name="Music and dancing" value="Music and dancing">Music and dancing</option>
                                <option name="Sports and outdoor activities" value="Sports and outdoor activities">Sports and outdoor activities</option>
                                <option name="Art and design" value="Art and design">Art and design</option>
                                <option name="Technology and compute science" value="Technology and compute science">Technology and compute science</option>
                                <option name="Movies and TV shows" value="Movies and TV shows">Movies and TV shows</option>
                                <option name="Video games" value="Video games">Video games</option>
                                <option name="Reading and writing" value="Reading and writing">Reading and writing</option>
                                <option name="Psychology and self-help" value="Psychology and self-help">Psychology and self-help</option>
                                <option name="Science and nature" value="Science and nature">Science and nature</option>
                                <option name="Photography and cinema" value="Photography and cinema">Photography and cinema</option>
                                <option name="Business and finance" value="Business and finance">Business and finance</option>
                                <option name="Culture and history" value="Culture and history">Culture and history</option>
                                <option name="Social sciences and politics" value="Social sciences and politics">Social sciences and politics</option>
                                <option name="Education and learning" value="Education and learning">Education and learning</option>
                            </select>
                        </div>
                        <div className='select-input box'>
                            {/* <span>Language:</span> */}
                            <select name="occupation" id="occupation" onChange={(event) => setLanguage(event.currentTarget.value)}>
                                <option value="null" selected disabled>Select language:</option>
                                <option name="English" value="English">English</option>
                                <option name="Spanish" value="Spanish">Spanish</option>
                                <option name="French" value="French">French</option>
                                <option name="Italian" value="Italian">Italian</option>
                                <option name="Portuguese" value="Portuguese">Portuguese</option>
                                <option name="Chinese" value="Chinese">Chinese</option>
                                <option name="German" value="German">German</option>
                                <option name="Russian" value="Russian">Russian</option>
                                <option name="Japanese" value="Japanese">Japanese</option>
                                <option name="Arab" value="Arab">Arab</option>
                            </select>
                        </div>

                    </div>

                    <button className='mixUpBtn2' onClick={(e) => handleForm(e)}>
                        <span className="TxtEffect">Mix up</span>
                    </button>
                </form>
            </div >

            {
                uri3 !== "" &&
                <>
                    <div className='recCont'>
                        <h3 className='recTitle'>Here are your recommendations!</h3>
                        {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                        <div className='spotiCards'>
                            <>
                                <div>
                                    <h4>{recomendacion1}</h4>
                                    <Spotify link={`https://open.spotify.com/artist/${uri1}?si=4472348a63dd4f83`} />
                                </div>
                                <div>
                                    <h4>{recomendacion2}</h4>
                                    <Spotify link={`https://open.spotify.com/artist/${uri2}?si=4472348a63dd4f83`} />
                                </div>
                                <div>
                                    <h4>{recomendacion3}</h4>
                                    <Spotify link={`https://open.spotify.com/artist/${uri3}?si=4472348a63dd4f83`} />
                                </div>
                            </>
                        </div>


                        <form>
                            <legend>Please, choose your favourite recommendation:</legend>
                            <div className='recRadio'>
                                <label for="f-option" class="l-radio">
                                <input type="radio" id="f-option" name="selector" tabindex="1" value="opcion1" onClick={(e) => { handleOption(e.currentTarget.value) }} />
                                <span>#1</span></label>
                                <label for="s-option" class="l-radio">
                                <input type="radio" id="s-option" name="selector" tabindex="2" value="opcion2" onClick={(e) => { handleOption(e.currentTarget.value) }} />
                                <span>#2</span></label>
                                <label for="t-option" class="l-radio">
                                <input type="radio" id="t-option" name="selector" tabindex="3" value="opcion3" onClick={(e) => { handleOption(e.currentTarget.value) }} />
                                <span>#3</span></label>
                            </div>
                            <div className='recRadio'>
                                <label>1</label>
                                <input type="radio" id="opcion1" name="opcion" value="opcion1" onClick={(e) => { handleOption(e.currentTarget.value) }} />

                                <label>2</label>
                                <input type="radio" id="opcion2" name="opcion" value="opcion2" onClick={(e) => { handleOption(e.currentTarget.value) }} />

                                <label>3</label>
                                <input type="radio" id="opcion3" name="opcion" value="opcion3" onClick={(e) => { handleOption(e.currentTarget.value) }} />

                            </div>

                            <div>
                                <button onClick={(e) => { handleRecommendation(e) }} className="recBtn">Share</button>
                            </div>
                        </form>

                    </div>
                </>
            }
        </>
    );
}

export default SignUp;