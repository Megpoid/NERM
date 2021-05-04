import React, { useState} from 'react';
import { Link } from 'react-router-dom';

import { showErrorMessage } from '../../../helpers/message'
import { showLoading } from '../../../helpers/loader';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { SignInInstance } from '../../../api/auth';
import { isAuthenticated, setAuthentication } from '../../../helpers/auth';


const SignIn = () => {

    const[formData, setFormData] = useState({ 
        email: '', password: '', 
        errorMessage: false, isLoading: false
    })

    const { email, password, errorMessage, isLoading } = formData

    const handleChange = (evt) => {
        setFormData({ 
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMessage: ''
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        if(isEmpty(email) || isEmpty(password) ) {
            setFormData({ ...formData, errorMessage: 'All fields is required.' })
        } else if(!isEmail(email)) {
            setFormData({ ...formData, errorMessage: 'Invalid Email' })
        } else {
            const { email, password } = formData
            const data = { email, password }
            setFormData({ ...formData, isLoading: true})
            await SignInInstance(data).then(response => {
                setFormData({ ...formData, isLoading: false })
                setAuthentication(response.data.token, response.data.user)
                if(isAuthenticated() && isAuthenticated.role === 1) {
                    console.log('you`re admin, redirecting to admin dashboard')
                } else {
                    console.log('you`re just an ordinary user, redirecting to user dahsboard')
                }
            }).catch(err => {
                setFormData({ ...formData, isLoading: false, errorMessage: err.response.data.errorMessage })
            })
        }
    }

    const showSignInForm = () => {
        return(
            <form className="signup-form" onSubmit={ handleSubmit } noValidate>
                {/* Email */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                    </div>
                    <input type="email" name="email" value={ email } className="form-control" placeholder="Email" onChange={ handleChange } />
                </div>
                {/* Password */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                    </div>
                    <input type="password" name="password" value={ password } className="form-control" placeholder="Password" onChange={ handleChange } />
                </div>
                {/* Sign Up Button */}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">Sign In</button>
                </div>
                <p className="text-center text-white">Don't have a account? <Link to="/signup">Sign Up</Link></p>
            </form>
        )
    };

    return(
        <div className="col-md-5 mt-5 mx-auto align-self-center">
            <div className="card">
                <div className="card-header bg-secondary">
                    <h3>Sign In</h3>
                </div>
                <div className="card-body">
                    { errorMessage && showErrorMessage(errorMessage) }
                    { isLoading && <div className="text-center pb-4">{ showLoading() }</div> }
                    { showSignInForm() }
                </div>
            </div>
        </div>
    )
}

export default SignIn;