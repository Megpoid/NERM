import React, { Conponent, useState } from 'react';
import { Link } from 'react-router-dom';

import { showErrorMessage, showSuccessMessage } from '../../helpers/message'
import { showLoading } from '../../helpers/loader';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { SignUpInstance } from '../../api/auth';

const SignUp = () => {
    const[formData, setFormData] = useState({ username: '', email: '', password: '', confirm_password: '', successMessage: false, errorMessage: false, isLoading: false })
    // Defining the State
    const { username, email, password, confirm_password, successMessage, errorMessage, isLoading } = formData
    // HandleChange
    const handleChange = (evt) => { setFormData({ ...formData, [evt.target.name]: evt.target.value, successMessage: '', errorMessage: '' }) }
    // HandleSubmit
    const handleSubmit = (evt) => { 
        evt.preventDefault();
        if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(confirm_password)) {
            setFormData({ ...formData, errorMessage: 'All fields is required.' })
        } else if(!isEmail(email)) {
            setFormData({ ...formData, errorMessage: 'Invalid Email.' })
        } else if(!equals(password, confirm_password)) { 
            setFormData({ ...formData, errorMessage: 'Password and Confirm Password doesn`t match.' })
        } else {
            const { username, email, password } = formData
            const data = { username, email, password }
            setFormData({ ...formData, isLoading: true })
            SignUpInstance(data).then((response) => {
                console.log(response)
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    isLoading: false,
                    successMessage: response.data.successMessage
                })
            }).catch((err) => {
                setFormData({ ...formData, isLoading: false, errorMessage: err.response.data.errorMessage })
            })
        }
    }
    // View
    const showSignUpForm = () => {
        return(
            <form className="signup-form" onSubmit={ handleSubmit } noValidate>
                {/* Username */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                    </div>
                    <input type="text" name="username" value={ username } className="form-control" placeholder="Username" onChange={ handleChange } />
                </div>
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
                {/* Confirm Password */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                    </div>
                    <input type="password" name="confirm_password" value={ confirm_password } className="form-control" placeholder="Confirm Password" onChange={ handleChange } />
                </div>
                {/* Sign Up Button */}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
                </div>
                <p className="text-center text-white">Have a account? <Link to="/login">Login In</Link></p>
            </form>
        )
    };

    return(
        <div className="col-md-5 mt-5 mx-auto align-self-center">
            <div className="card">
                <div className="card-header">
                    <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                    { errorMessage && showErrorMessage(errorMessage) }
                    { successMessage && showSuccessMessage(successMessage) }
                    { isLoading && <div className="text-center pb-4">{ showLoading() }</div> }
                    { showSignUpForm() }
                </div>
            </div>
        </div>
    )
}

export default SignUp;