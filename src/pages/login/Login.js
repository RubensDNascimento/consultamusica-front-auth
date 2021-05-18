import React from 'react'

import {ErrorMessage, Formik, Form, Field} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'

import './Login.css'

const Login = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:8080/v1/api/auth', values)
        .then(resp => {
            const {data} = resp
            if (data){
                localStorage.setItem('app-token', data)
                history.push('/')
            }
        })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required().min(5).max(255),
        password: yup.string().min(8).max(16).required()
    })
        return (
            <>
            <h1> Login </h1>
            <p>Preencha os dados:</p>
            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
                <Form className="Login">
                    <div className="Login-group">
                        <label className="Login-Label">E-mail:</label>
                        <Field  name = "email" className="Login-Field"/>
                        <ErrorMessage component="span" name ="email" className="Login-Error"/>
                    </div>
                    <div className="Login-group">
                        <label className="Login-Label">Senha:</label>
                        <Field  name = "password" className="Login-Field"/>
                        <ErrorMessage component="span" name ="password" className="Login-Error"/>
                    </div>
                    <button className="Login-Btn" type="submit">Login</button>
                </Form>
            </Formik>
            </>)
    }


export default Login