import React from 'react'


import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'


import '../login/Login.css'

const Registro = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:8080/v1/api/user', values)
            .then(resp => {
                const { data } = resp
                if (data) {
                    history.push('/login')
                }
            })
    }
    const validations = yup.object().shape({
        firstName: yup.string().min(1).max(60).required(),
        lastName: yup.string().min(1).max(60).notRequired(),
        email: yup.string().email().required().min(5).max(255),
        password: yup.string().min(8).max(16).required()
    })
    return (
        <>
            <h1> Registro </h1>
            <p>Preencha os dados para criar um novo usuario:</p>
            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
                <Form className="Login">
                    <div className="Login-group">
                        <Field name="firstName" className="Login-Field"  />
                        <ErrorMessage component="span" name="firstName" className="Login-Error" />
                    </div>
                    <div className="Login-group">
                        <Field name="lastName" className="Login-Field" />
                        <ErrorMessage component="span" name="lastName" className="Login-Error" />
                    </div>
                    <div className="Login-group">
                        <Field name="email" className="Login-Field" />
                        <ErrorMessage component="span" name="email" className="Login-Error" />
                    </div>
                    <div className="Login-group">
                        <Field name="password" className="Login-Field" />
                        <ErrorMessage component="span" name="password" className="Login-Error" />
                    </div>
                    <button className="Login-Btn" type="submit">Registrar</button>
                </Form>
            </Formik>
        </>)
}

export default Registro