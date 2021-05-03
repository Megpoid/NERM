import axios from 'axios';

const ConfigAppJson = {
    'Content-type': 'application/json'
}

export const SignUpInstance = async (data) => {
    const response = await axios.post('http://localhost:5000/api/auth/signup', data, ConfigAppJson)

    return (response);
}

export const SignInInstance = async (data) => {
    const response = await axios.post('http://localhost:5000/api/auth/signin', data, ConfigAppJson)

    return (response);
}