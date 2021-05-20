import React from 'react'

import {ErrorMessage, Formik, Form, Field} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'


import './home.css'

const Home = () => {
    const handleSubmit = values => {
        axios.post(process.env.REACT_APP_API_URL + 'v1/api/search', values)
        .then(resp => {
            console.log(resp)
            const {data} = resp
            if (resp.status==200){
                history.push({
                    pathname: '/song',
                    state: {
                        songName: data.songName,
                        artist: data.artist,
                        album: data.album,
                        year: data.year,
                        lyrics: data.lyrics,
                        translation: data.Translation,
                        picture: data.picture
                    }
                });
            }
        })
    }

    const logout = () =>{
        localStorage.removeItem('user-role')
        localStorage.removeItem('app-token')
        history.push('/') 
    }
    
    const isAdmin = localStorage.getItem('user-role') === 'admin';
    const validations = yup.object().shape({
        artist: yup.string().required().min(2),
        songName: yup.string().required().min(2)
    })
        return (
            <>
            
            <h1>Consulta Musica</h1>
            <p>Preencha os dados:</p>
            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>

                <Form className="Home">
                    <div className="Home-group">
                        <label>Banda ou Artista:</label>
                        <Field  name = "artist" className="Home-Field"/>
                        <ErrorMessage component="span" name ="artist" className="Home-Error"/>
                    </div>
                    <div className="Home-group">
                        <label>Musica:</label>
                        <Field  name = "songName" className="Home-Field"/>
                        <ErrorMessage component="span" name ="songName" className="Home-Error"/>
                    </div>
                    <button className="Home-Btn" type="submit">Buscar</button>
                    <button className="Home-Btn" type="reset">Limpar</button>
                </Form>
            </Formik>
            <button className="Login-Btn" onClick = {logout}>Logout</button>
            {isAdmin && <button className="Login-Btn" onClick = {() => history.push('/post')}>Nova Musica</button>}
            </>)
    }


export default Home