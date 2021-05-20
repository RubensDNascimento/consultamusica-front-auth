import React from 'react'


import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'


import '../login/Login.css'


const Post = () => {
    const handleSubmit = values => {
        var auxPic = ''
        console.log(values.file)
        console.log(values)
        var forms = new FormData();
        var imagefile = document.querySelector('#file');
        var imagename = values.file.name
        forms.append('image', imagefile.files[0]);
        forms.append('imageName', imagename);
        for (var key of forms.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        console.log(imagefile)
        axios.post('http://localhost:8080/v1/api/uploads', forms, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(resp => {
            const { data } = resp
            console.log(data)
            values.picture = data
            auxPic = data
            console.log("values.picture" + values.picture)
            console.log("auxPic1: " + auxPic)
            values.picture = auxPic

            axios.post('http://localhost:8080/v1/api/post', values)
                .then(resp => {
                    console.log("values.picture" + values.picture)
                    console.log("auxPic2: " + auxPic);
                    console.log(resp)
                    const { data } = resp
                    console.log(data.picture)
                    if (data) {
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
                .catch(error => {
                    console.log(error.response)
                })
        })
    }
    const validations = yup.object().shape({
        songName: yup.string().required().min(2),
        artist: yup.string().required().min(2),
        album: yup.string().required().min(2).max(255),
        year: yup.number(),
        lyrics: yup.string().required(),
        Translation: yup.string(),
        picture: yup.mixed()
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
            }} onSubmit={handleSubmit} validationSchema={validations} >
                {({ errors, touched, setFieldValue }) => (
                    <Form id="myForm" className="Login">
                        <div className="Login-group">
                            <div className="Login-group">
                                <label>Banda ou Artista:</label>
                                <Field name="artist" className="Login-Field" />
                                <ErrorMessage component="span" name="artist" className="Login-Error" />
                            </div>
                            <label>Nome da Musica:</label>
                            <Field name="songName" className="Login-Field" />
                            <ErrorMessage component="span" name="songName" className="Login-Error" />
                        </div>
                        <div className="Login-group">
                            <label>Album:</label>
                            <Field name="album" className="Login-Field" />
                            <ErrorMessage component="span" name="album" className="Login-Error" />
                        </div>
                        <div className="Login-group">
                            <label>Ano:</label>
                            <Field name="year" className="Login-Field" type="number" />
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
                        <div className="Login-group">
                            <label>Imagem:</label>
                            <input id="file" name="file" type="file" onChange={(event) => {
                                setFieldValue("file", event.currentTarget.files[0]);


                            }} />
                            <ErrorMessage component="span" name="pic" className="Login-Error" />
                        </div>
                        <button className="Login-Btn" type="submit">Registrar</button>
                    </Form>
                )}
            </Formik>
            <button className="Login-Btn" onClick={() => history.push('/')}>Voltar</button>
        </>)
}


export default Post