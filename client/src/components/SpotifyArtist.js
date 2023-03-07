import apiClient from "../spotifyAuth/spotify";
import { useEffect, useState } from "react";
import Spotify from "react-spotify-embed";
import "../assets/check.svg"
import "../assets/wrong.svg"


export default function SpotifyArtist(props) {

    const [uri, setUri] = useState("");
    const [uri2, setUri2] = useState("");
    const [uri3, setUri3] = useState("");
    

    useEffect(() => {
        const getData = async () => {

            if(props){
            
            await apiClient.get(`/search?query=${props.artist}&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=20`).then((response) => {
                const uri = response.data.artists.items[0].uri.split(":")
                setUri(uri[2])
            });
            await apiClient.get(`/search?query=${props.artist2}&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=20`).then((response) => {
                const uri = response.data.artists.items[0].uri.split(":")
                setUri2(uri[2])
            });
            await apiClient.get(`/search?query=${props.artist3}&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=20`).then((response) => {
                const uri = response.data.artists.items[0].uri.split(":")
                setUri3(uri[2])
            }) 
            } else {await props}

            
        }

        getData()
    }, [props]);




return (
    <>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Spotify link={`https://open.spotify.com/artist/${uri}?si=4472348a63dd4f83`} />
            <Spotify link={`https://open.spotify.com/artist/${uri2}?si=4472348a63dd4f83`} />
            <Spotify link={`https://open.spotify.com/artist/${uri3}?si=4472348a63dd4f83`} />
        </div>

    </>
)
}