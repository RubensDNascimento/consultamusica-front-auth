import React from 'react'


import { ErrorMessage, Formik, Form, Field} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'


import '../login/Login.css'


const Post = () => {
    const handleSubmit = values => {
        console.log(values)
        axios.post('http://localhost:8080/v1/api/post', values)
            .then(resp => {
                console.log(resp)
                const { data } = resp
                if (data){
                    history.push({
                        pathname: '/song',
                        state: {
                            songName: data.songName,
                            artist: data.artist,
                            album: data.album,
                            year: data.year,
                            lyrics: data.lyrics,
                            translation: data.Translation
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
    const validations = yup.object().shape({
        songName: yup.string().required().min(2),
        artist: yup.string().required().min(2),
        album: yup.string().required().min(2).max(255),
        year: yup.number(),
        lyrics: yup.string().required(),
        Translation: yup.string(),
        picture: yup.object()
    })
    return (
        <>
            <h1> Registro </h1>
            <p>Preencha os dados para criar um novo usuario:</p>
            <Formik initialValues={{
                songName: '',
                artist: '',
                album: '',
                year: 1,
                lyrics: '',
                Translation: '',
                picture: ''
            }} onSubmit={handleSubmit} validationSchema={validations}>
                
                <Form className="Login">
                    <div className="Login-group">
                    <div className="Login-group">
                        <label>Banda ou Artista:</label>
                        <Field name="artist" className="Login-Field" />
                        <ErrorMessage component="span" name="artist" className="Login-Error" />
                    </div>
                        <label>Nome da Musica:</label>
                        <Field name="songName" className="Login-Field"  />
                        <ErrorMessage component="span" name="songName" className="Login-Error" />
                    </div>
                    <div className="Login-group">
                        <label>Album:</label>
                        <Field name="album" className="Login-Field" />
                        <ErrorMessage component="span" name="album" className="Login-Error" />
                    </div>
                    <div className="Login-group">
                        <label>Ano:</label>
                        <Field name="year" className="Login-Field" type="number"/>
                        <ErrorMessage component="span" name="year" className="Login-Error" />
                    </div>
                    <div className="Login-group">
                        <label>Letra:</label>
                        <Field name="lyrics" className="Login-Field" as="textarea" />
                        <ErrorMessage component="span" name="lyrics" className="Login-Error" />
                    </div>
                    <div className="Login-group">
                        <label>Tradução:</label>
                        <Field name="Translation" className="Login-Field" as="textarea" />
                        <ErrorMessage component="span" name="Translation" className="Login-Error" />
                    </div>
                    <button className="Login-Btn" type="submit">Registrar</button>
                </Form>
            </Formik>
            <button className="Login-Btn" onClick = {() => history.push('/')}>Voltar</button>
        </>)
}


export default Post