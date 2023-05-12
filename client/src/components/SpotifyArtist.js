import { useEffect, useState } from "react";
import Spotify from "react-spotify-embed";
import axios from "axios";

import "../assets/check.svg"
import "../assets/wrong.svg"

export default function SpotifyArtist(props) {
  const [uri, setUri] = useState("");
  const [uri2, setUri2] = useState("");
  const [uri3, setUri3] = useState("");

  useEffect(() => {
    const getData = async () => {
        console.log(props);
      if (props) {

        await axios.post('http://localhost:3000/results', {
        artist: props.artist,
        artist2: props.artist2,
        artist3: props.artist3
        })
        .then((response) => {
            setUri(response.data[0])
            setUri2(response.data[1])
            setUri3(response.data[2])
        }) 
      } else {
        await props.artist && getData();
      }
    };
    getData();
  }, [props]);

  return (
    <>
      {uri3 !== "" && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Spotify
            link={`https://open.spotify.com/artist/${uri}?si=mTiITmlHQpaGkoivGTv8Jw`}
          />
          <Spotify
            link={`https://open.spotify.com/artist/${uri2}?si=4472348a63dd4f83`}
          />
          <Spotify
            link={`https://open.spotify.com/artist/${uri3}?si=4472348a63dd4f83`}
          />
        </div>
      )}
    </>
  );
}