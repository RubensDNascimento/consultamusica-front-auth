import React from 'react'
import { useLocation } from "react-router-dom";
import { history } from '../../history'

import './Song.css'

const Song = () => {
    const location = useLocation();
    console.log(location.pathname);
    console.log(location.state);
    var songName = ''
    var artist = ''
    var album = ''
    var year = ''
    var lyrics = ''
    var translation = ''
    var picture = 'a'
    var base64Flag = 'data:image/jpeg;base64,';

    const arrayBufferToBase64 = buffer => {

        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    if (location.state) {

        songName = location.state.songName
        artist = location.state.artist
        album = location.state.album
        year = location.state.year
        lyrics = location.state.lyrics
        translation = location.state.translation
        picture = location.state.picture
        console.log("location.state.picture :"+location.state.picture)
        //var picture2 = picture.replaceAll("\\", "/")
        console.log(picture)
    }


    return (

        <>
            <div id="head">
                <button className="Login-Btn" onClick={() => history.push('/')}>Buscar</button>
                <h1 id="txtTituloLetra">{songName}</h1>
            </div>
            <div id="corpo">
                <div id="infos">
                    <h2 id="txtArtist">{artist}</h2>
                    <img id="imgArtist" src={"http://localhost:8080//" + picture}></img>
                    <h3 id="txtTituloAlbum">Album:</h3>
                    <h3 id="txtAlbum">{album}</h3>
                    <h3 id="txtTituloAlbumAno">Ano:</h3>
                    <h3 id="txtAlbumAno">{year}</h3>
                </div>
                <div id="letra">
                    <h3 id="txtTituloAlbumAno">Letra original:</h3>
                    <p id="txtLetra">{lyrics}</p>
                    <h3 id="txtTituloAlbumAno">Tradução:</h3>
                    <p id="txtLetra">{translation}</p>
                </div>

            </div>
        </>
    )

}



export default Song